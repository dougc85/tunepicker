import { React } from 'react';
import { LoginSignupStyled } from './LoginSignup.styled';
import LoginSignupForm from './LoginSignupForm/LoginSignupForm';

function LoginSignup(props) {

  const { authStyle, loginStyle, setLoginStyle, signupStyle, setSignupStyle, setUser } = props;

  const loginShowing = { left: "50%", transform: "translateX(-50%)" };
  const loginHiding = { left: 0, transform: "translateX(-150%)" };
  const signupShowing = { right: "50%", transform: "translateX(50%)" };
  const signupHiding = { right: "0", transform: "translateX(150%)" };

  function switchAuth(e) {
    e.preventDefault();

    if (e.target.id === 'switch-from-signup') {
      setLoginStyle(loginShowing);
      setSignupStyle(signupHiding);
    } else if (e.target.id === 'switch-from-login') {
      setLoginStyle(loginHiding);
      setSignupStyle(signupShowing);
    }
  }


  return (
    <LoginSignupStyled action="" className="LoginSignup" style={authStyle}>
      <LoginSignupForm formStyle={loginStyle} legend="Log In" submitMessage="Enter" switchAuth={switchAuth} formType="login" switchMessage={"Need to create an account?"} />
      <LoginSignupForm formStyle={signupStyle} legend="Sign Up" submitMessage="Create Account" switchAuth={switchAuth} formType="signup" setUser={setUser} switchMessage={"Already Have An Account?"} />
    </LoginSignupStyled>
  )
}

export default LoginSignup;