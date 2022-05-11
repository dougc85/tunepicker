import React, { useContext } from "react";
import SubContext from "../../context/sub-context";
import { useState } from "react";
import LoginSignup from "../LoginSignup/LoginSignup";
import { WelcomeStyled, WelcomeButtons, WelcomeButton } from "./Welcome.styled";

function Welcome() {

  const { setUser } = useContext(SubContext);

  const [buttonsStyle, setButtonsStyle] = useState({});
  const [authStyle, setAuthStyle] = useState({ transform: "translateX(50%)" });
  const [loginStyle, setLoginStyle] = useState({ transform: "translateX(0vw)", display: "none" });
  const [signupStyle, setSignupStyle] = useState({ transform: "translateX(0vw)", display: "none" });

  function removeButtons(e) {
    setButtonsStyle({
      transform: "translate(-150%, -50%)",
      left: "0",
    });
    setAuthStyle({
      transform: "translateX(-50%)"
    })
    if (e.target.id === 'signup') {
      setSignupStyle(
        { transform: "translateX(50%)", right: "50%" }
      )
      setTimeout(() => {
        setLoginStyle({
          transform: "translateX(-150%)",
          left: 0
        })
      }, 1000);
    } else if (e.target.id === 'login') {
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
    <WelcomeStyled>
      <h1>tunePicker</h1>
      <p>
        You're trying to decide what song to play next on your gig. Unfortunately, you can only ever
        think of the same three tunes, even though you know hundreds. You need a tunePicker!
      </p>
      <div>
        <WelcomeButtons leftStyle={buttonsStyle.left} transformStyle={buttonsStyle.transform}>
          <WelcomeButton onClick={removeButtons} id="login">
            Log In
          </WelcomeButton>
          <WelcomeButton onClick={removeButtons} id="signup">
            Sign Up
          </WelcomeButton>
        </WelcomeButtons>
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
    </WelcomeStyled >

  )
}

export default Welcome;