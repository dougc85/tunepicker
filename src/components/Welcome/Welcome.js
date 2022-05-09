import React, { useContext } from "react";
import SubContext from "../../context/sub-context";
import { useState } from "react";
import './Welcome.scss';
import LoginSignup from "../LoginSignup/LoginSignup";

function Welcome() {

  const { setUser } = useContext(SubContext);

  const [buttonsStyle, setButtonsStyle] = useState({});
  const [authStyle, setAuthStyle] = useState({ transform: "translateX(50%)" });
  const [loginStyle, setLoginStyle] = useState({ transform: "translateX(0vw)", display: "none" });
  const [signupStyle, setSignupStyle] = useState({ transform: "translateX(0vw)", display: "none" });

  function removeButtons(e) {
    setButtonsStyle({
      transform: "translate(-150%, -50%)",
      left: 0,
    });
    setAuthStyle({
      transform: "translateX(-50%)"
    })
    if (e.target.id === 'signup-button') {
      setSignupStyle(
        { transform: "translateX(50%)", right: "50%" }
      )
      setTimeout(() => {
        setLoginStyle({
          transform: "translateX(-150%)",
          left: 0
        })
      }, 1000);
    } else if (e.target.id === 'login-button') {
      setLoginStyle({
        transform: "translateX(-50%)", left: "50%"
      })
      setSignupStyle({
        transform: "translateX(150%)",
        right: 0
      })
    }
  }

  return (
    <div className="Welcome">
      <h1 className="Welcome-title">tunePicker</h1>
      <p className="Welcome-description">
        You're trying to decide what song to play next on your gig. Unfortunately, you can only ever
        think of the same three tunes, even though you know hundreds. You need a tunePicker!
      </p>
      <div className="Welcome-bottom">
        <div className="Welcome-buttons" style={buttonsStyle}>;
          <button onClick={removeButtons} className="Welcome-buttons-login Welcome-buttons-button" id="login-button">
            Log In
          </button>
          <button onClick={removeButtons} className="Welcome-buttons-signup Welcome-buttons-button" id="signup-button">
            Sign Up
          </button>
        </div>
        <LoginSignup
          authStyle={authStyle}
          setAuthStyle={setAuthStyle}
          loginStyle={loginStyle}
          setLoginStyle={setLoginStyle}
          signupStyle={signupStyle}
          setSignupStyle={setSignupStyle}
          setUser={setUser}
        />
      </div>
    </div>

  )
}

export default Welcome;