import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 RJ. All rights reserved.
        <span className="about-link">
          Contect {" "}
          <a href="https://ssuj-chang.github.io/" target="_blank" rel="noopener noreferrer">
            RJ
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
