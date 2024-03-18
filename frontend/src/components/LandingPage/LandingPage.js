import React from "react";
import "../../css/LandingPage.css";
import x from "../../assets/xlogo.jpg";

const LandingPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        backgroundImage: `linear-gradient(to top right, #2D3947, #151B26)`,
        backgroundRepeat: "no-repeat",
        display: "flex",
        height: "100%",
        zIndex: "-2",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          backgroundImage: `url(${x})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      ></div>
      <div className="landing-container">
        <div className="landing-nav-container">
          <div className="landing-nav-sessions">
            <div style={{ marginRight: "20px" }}>
              <a href="/login">
                <button className="landing-nav-login--button">Login</button>
              </a>
            </div>

            <div>
              <a href="/register">
                <button className="landing-nav-register--button">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="landing-main" style={{ marginLeft: "450px", marginTop: "100px" }}>
          <div className="landing-message">
            <h2
              style={{
                fontSize: "3em",
                fontWeight: "200",
                color: "white",
                width: "57%",
              }}
            >
              Your one way ticket to organization
            </h2>
            <h3 style={{ fontWeight: "200", color: "white", width: "46%" }}>
              Why us? We give you everything you need to stay up to date,
               track your work, and reach your goals
            </h3>
            <div className="landing-message-button--div">
              <a href="/login">
                <button className="landing-message--button">Demo</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
