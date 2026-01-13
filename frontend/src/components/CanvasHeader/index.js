import classes from "./index.module.css";
import { useParams } from "react-router";
import boardContext from "../../store/board-context";
import { useContext, useState } from "react";

function CanvasHeader() {
  const [message, setMessage] = useState("");
  const [emailToShare, setEmailToShare] = useState("");
  const [emailToUnshare, setEmailToUnshare] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUnshareModal, setShowUnshareModal] = useState(false);
  const { elements } = useContext(boardContext);
  const { id } = useParams();

  const saveHandler = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/canvas", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ canvasId: id, elements: elements }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage("Failed saving canvas");
      return;
    }

    setMessage(data.message || "canvas saved");
  };

  const shareHandler = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/canvas/share", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ canvasId: id, emailToShare: emailToShare }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "canvas not shared");
      return;
    }

    setMessage(data.message);

    
  };

  const unshareHandler = async () => {};
  return (
    <>
      <div className={classes.container}>
        <button onClick={saveHandler}>Save</button>

        <div className="relative">
          <button onClick={() => setShowShareModal((v) => !v)}>Share</button>

          {showShareModal && (
            <div className={classes.sharewindow}>
              <label>Share with</label>
              <input
                type="email"
                onChange={(e) => setEmailToShare(e.target.value)}></input>
              <button onClick={shareHandler}>Share</button>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowUnshareModal((v) => !v)}>
            Unshare
          </button>

          {showUnshareModal && (
            <div className={classes.sharewindow}>
              <label>Unshare with</label>
              <input
                type="email"
                onChange={(e) => setEmailToUnshare(e.target.value)}></input>
              <button onClick={unshareHandler}>Share</button>
            </div>
          )}
        </div>
      </div>

      {message && <div className={classes.message}>{message}</div>}
    </>
  );
}

export default CanvasHeader;
