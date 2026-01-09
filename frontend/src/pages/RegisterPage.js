import classes from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || !confirmPassword || !email) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.message || "Registration Failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      setError("Server not reachable");
    }
  };
  return (
    <div className={`${classes.container}`}>
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
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.card}>
          <form className={classes.form} onSubmit={handleRegister}>
            <label className={classes.formheading}>Username</label>
            <input
              className={classes.inputfield}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}></input>

            <label className={classes.formheading}>Email</label>
            <input
              className={classes.inputfield}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></input>

            <label className={classes.formheading}>Password</label>
            <input
              className={classes.inputfield}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></input>

            <label className={classes.formheading}>Confirm Password</label>
            <input
              className={classes.inputfield}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}></input>

            <button className={classes.button} type="Submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
