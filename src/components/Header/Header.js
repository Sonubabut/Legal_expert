import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Header.css';

function Header() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<div className="left-logo">
         <img src={"https://test.digitalt3.com/wp-content/uploads/2024/05/DT3_WOBG_LOGO.png"} alt="Logo" />
       </div>
			<nav ref={navRef}>
				<a href="/">Home</a>
				<a href="/chat">Target</a>
        <a href="/technique">Technique</a>
        {/* <a href="/team">Team</a> */}
				{/* <a href="/about">About Us</a> */}
        
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
      <div className="right-logo">
        <img src={"https://test.digitalt3.com/wp-content/uploads/2024/05/Target.png"} alt="Logo" />
        <img src={"https://test.digitalt3.com/wp-content/uploads/2023/11/cropped-cropped-DT3_wobg.png"} alt="Logo" style={{ width: "55px"}} />
        </div>
		</header>
	);
}

export default Header;