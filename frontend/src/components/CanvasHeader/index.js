import classes from "./index.module.css";
import { useParams } from "react-router";
import boardContext from "../../store/board-context";
import { useContext, useState } from "react";

function CanvasHeader() {
  const [message, setMessage] = useState("");
  const [emailToShare, setEmailToShare] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
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

    if (!response.ok) {
      setMessage(response.message || "Failed saving canvas");
      return;
    }
    if (response.ok) {
      setMessage(response.message || "Canvas saved");
    }
  };

  const shareHandler = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/canvas/share", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ canvasId: id, email: emailToShare }),
    });
      
      if (!response.ok) {
          
      }
  };

  const unshareHandler = async () => {};
  return (
    <div className={classes.container}>
      <button onClick={saveHandler}>Save</button>
      <button onClick={() =>setShowShareModal(false)}>Share</button>
      <button onClick={unshareHandler}>Unshare</button>
    </div>
  );
}

export default CanvasHeader;
