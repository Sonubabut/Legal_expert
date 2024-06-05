import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IoSend } from "react-icons/io5";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import "./Chat.css";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "89vh",
    width: "100%",
    backgroundImage: `url(${'https://test.digitalt3.com/wp-content/uploads/2024/06/legal_bgimg.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    position: 'relative',
    borderBottom: '2px solid #ddd',
  },
  chatInputContainer: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
  },
  chatInput: {
    flex: 1,
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
    marginRight: '8px',
  },
  chatSubmit: {
    padding: '8px 5px',
    backgroundColor: '#fff',
    color: '#44929d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    "&:hover": {
      backgroundColor: '#44929d',
      color: '#fff',
    },
  },
  chatClear: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    padding: '3px 15px',
    cursor: 'pointer',
    marginBottom: '15px',
    "&:hover": {
      backgroundColor: '#bdbdbd',
    },
  },
  chatMessageText: {
    whiteSpace: 'pre-wrap',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isSending) {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputValue },
    ]);
    try {
      const response = await axios.post("/api/get-response", {
        question: inputValue,
      });

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: response.data.response },
        ]);
        setIsSending(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "An error occurred." },
      ]);
      setIsSending(false);
    }
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHistory}>
        <div className="chat-indicator">
          {isSending && <div className="typing-indicator">Legal expert......</div>}
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <div className="chat-message-avatar">
                <img
                  src={
                    message.role === "user"
                      ? "https://test.digitalt3.com/wp-content/uploads/2024/06/legal_chat2.png"
                      : "https://test.digitalt3.com/wp-content/uploads/2024/06/legal_exp.png"
                  }
                  alt={message.role}
                />
              </div>
              <div className="chat-message-content">
                <div className="chat-message-label">
                  {message.role === "user" ? "You" : "Legal Expert"}
                </div>
                <div className="chat-message-text">
                  {message.role === "assistant" ? (
                    <ReactMarkdown components={{
                      p: ({ node, ...props }) => <p {...props} style={{ margin: '20px 0' }} />,
                      strong: ({ node, ...props }) => <strong {...props} style={{ fontWeight: 'bold' }} />,
                    }}>
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <SyntaxHighlighter>
                      {message.content}
                    </SyntaxHighlighter>
                  )}
                  {message.role === "assistant" && (
                    <CopyToClipboard text={message.content}>
                      <div className="chat-message-copy">Copy</div>
                    </CopyToClipboard>
                  )}
                </div>
                <div className="chat-message-timestamp">
                  {new Date(Date.now() - (messages.length - index - 1) * 5000).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={classes.chatInputContainer}>
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={classes.chatInput}
          placeholder="Type your message here..."
          disabled={isSending}
        />
        <Button
          type="submit"
          className={classes.chatSubmit}
          disabled={isSending}
        >
          <IoSend />
          {isSending ? "Sending..." : ""}
        </Button>
      </form>
      <div className="chat-controls">
        <Button
          variant="contained"
          className={classes.chatClear}
          onClick={() => setMessages([])}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Chat;
