import { useEffect, useState } from "react";
import classes from "./DashboardPage.module.css";
import { useNavigate } from "react-router";
import authContext from "../auth/auth-context";
import { useContext } from "react";




function Dashboard() {
  const [canvases, setCanvases] = useState([]);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);
  const { logout } = useContext(authContext);
  const username = localStorage.getItem("WBusername");


  const fetchCanvases = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/canvas`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch canvases");
        return;
      }

      const data = await response.json();
      setCanvases(data);
    } catch (error) {
      setError("Could not Load canvases");
    }
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  const navigate = useNavigate();

  const handleCanvasOpen = (canvasId) => {
    navigate(`/canvas/${canvasId}`);
  };

  const handleCreateCanvas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/canvas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        setError("Failed to create canvas");
        return;
      }

      const data = await response.json();

      navigate(`/canvas/${data.canvasId}`);
    } catch (error) {
      setError("Failed to create canvas");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.topbar}>
        <h2 className={classes.greeting}>Hello {username}</h2>

        <button className={classes.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <h1 className={classes.heading}>My Canvases</h1>

      {error && <p className={classes.error}>{error}</p>}

      <div className={classes.dashboardcontainer}>
        {canvases.map((canvas) => (
          <div key={canvas._id} className={classes.card}>
            <h2 className={classes.cardTitle}>{canvas.title}</h2>
            <button
              className={classes.button}
              onClick={() => handleCanvasOpen(canvas._id)}>
              Open
            </button>
          </div>
        ))}

        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Create a New Canvas</h2>

          {!showCreateInput ? (
            <button
              className={classes.button}
              onClick={() => setShowCreateInput(true)}>
              Create
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter canvas title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={classes.input}
              />
              <button className={classes.button} onClick={handleCreateCanvas}>
                Create Canvas
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
