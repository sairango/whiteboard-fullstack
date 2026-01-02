import classes from "./LoginPage.module.css";
// import bgimg from "./../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../auth/auth-context";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(authContext);
  const handleLogin = (event) => {
    event.preventDefault();
    login();
    navigate("/dashboard");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftside}>
        <div className={classes.leftcontent}>
          <h1 className={classes.heading}>Collaborative WB</h1>
          <p className={classes.headingdesc}>
            Real-time collaborative whiteboard.
            <br />
            Draw. Think. Collaborate.
            <br />
            Design,discuss, and build together
            <br />
          </p>
        </div>
      </div>
      <div className={classes.rightside}>
        <div className={classes.card}>
          <form className={classes.form} onSubmit={handleLogin}>
            <label className={classes.formheading}>Username</label>
            <input className={classes.inputfield} type="password"></input>
            <label className={classes.formheading}>Password</label>
            <input className={classes.inputfield}></input>
            <button className={classes.button} type="Submit">Login</button>
            <div className={classes.registerline} onClick={handleRegisterClick}>Not Registered ? Click here to Register</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
