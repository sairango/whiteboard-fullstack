import classes from "./RegisterPage.module.css";


function Register() {
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
        <div className={classes.card}>
          <form className={classes.form}>
            <label className={classes.formheading}>Username</label>
            <input className={classes.inputfield}></input>
            <label className={classes.formheading}>Password</label>
            <input className={classes.inputfield} type="password"></input>
            <label className={classes.formheading}>Confirm Password</label>
            <input className={classes.inputfield} type="password"></input>
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
