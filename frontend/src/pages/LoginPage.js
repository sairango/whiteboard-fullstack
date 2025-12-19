import classes from "./LoginPage.module.css";
import bgimg from "./../assets/bg.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={classes.bg} style={{ backgroundImage: `url(${bgimg})` }}>
      <div className={classes.card}>
        <form className={classes.form}>
          <label className={classes.labels}>User Name:</label>
          <input className={classes.inputbox} type="text" id="username" />

          <label className={classes.labels}>Password:</label>
          <input className={classes.inputbox} type="password" id="password" />

          <button type="submit" className={classes.loginbutton}>
            Login
          </button>
        </form>
        <div className={classes.registerline} onClick={handleRegisterClick}>
          Register Here
        </div>
      </div>
    </div>
  );
}

export default Login;
