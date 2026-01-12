import classes from "./LoginPage.module.css";
// import bgimg from "./../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import authContext from "../auth/auth-context";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid Credentials");
        return;
      }
      

      localStorage.setItem("token", data.token);
      console.log(data.token);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Server not reachable");
    }
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
            <label className={classes.formheading}>Email</label>
            <input
              className={classes.inputfield}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"></input>

            <label className={classes.formheading}>Password</label>
            <input
              className={classes.inputfield}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"></input>

            {error && <p className={classes.error}>{error}</p>}

            <button className={classes.button} type="Submit">
              Login
            </button>
            <div className={classes.registerline} onClick={handleRegisterClick}>
              Not Registered ? Click here to Register
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
