import React from "react";
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="intro">
          <h2>Driving Legal Expert with AI!</h2>
          <p>Deliver Legal Solutions with Our AWS and SambaNova Powered Expert</p>
          <Link to="/chat" className="explore-button">
          Try&nbsp;&nbsp;Now
            <FaArrowRightLong
            style={{fontSize: "30px", width: "100px"}} />
          </Link>
        </div>
        <div className="robot-image">
          <img src="https://test.digitalt3.com/wp-content/uploads/2024/05/land-page_01.png" alt="AI Robot" />
        </div>
      </main>
      <footer className="home-footer">
        {/* <p>Start Your Legal Journey Today!</p> */}
      </footer>
    </div>
  );
};

export default Home;