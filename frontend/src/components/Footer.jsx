import React from "react";

// import images
import yoobeeLogo from "../assets/yoobee-logo.svg";
import facebookLogo from "../assets/facebook.svg";
import instagramLogo from "../assets/instagram.svg";
import twitterLogo from "../assets/twitter.svg";

// DONT FORGET TO IMPORT FOOTER IN APP.JSX

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <img className="yoobee-logo" src={yoobeeLogo} />
        </div>

        <div className="footer-socials">
          <img className="facebook-logo" src={facebookLogo} />
          <img className="instagram-logo" src={instagramLogo} />
          <img className="twitter-logo" src={twitterLogo} />
        </div>
      </div>
    </>
  );
};

export default Footer;
