import classes from "./index.module.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import boardContext from "../../store/board-context";
import authContext from "../../auth/auth-context";
import { useContext, useState,useEffect } from "react";

function CanvasHeader() {
  const [message, setMessage] = useState("");
  const [emailToShare, setEmailToShare] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const { elements } = useContext(boardContext);
  const { isAuthenticated, logout } = useContext(authContext);

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  const saveHandler = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/canvas", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ canvasId: id, elements }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage("Failed saving canvas");
      return;
    }

    setMessage(data.message || "Canvas saved");
  };

  const shareHandler = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/canvas/share", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ canvasId: id, emailToShare }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Canvas not shared");
      return;
    }

    setMessage(data.message);
    setShowShareModal(false);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          {/* LEFT ACTIONS */}
          <div className={classes.actions}>
            <button onClick={saveHandler}>Save</button>

            <div className={classes.relatives}>
              <button onClick={() => setShowShareModal((v) => !v)}>
                Share
              </button>

              {showShareModal && (
                <div className={classes.sharewindow}>
                  <label>Share with</label>
                  <input
                    type="email"
                    onChange={(e) => setEmailToShare(e.target.value)}
                  />
                  <button onClick={shareHandler}>Share</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT AUTH */}
          <div className={classes.auth}>
            {!isAuthenticated ? (
              <button onClick={() => navigate("/login")}>Login</button>
            ) : (
              <>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>

      {message && <div className={classes.message}>{message}</div>}
    </>
  );
}

export default CanvasHeader;
