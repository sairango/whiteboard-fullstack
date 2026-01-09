import { useEffect, useState } from "react";
import classes from "./DashboardPage.module.css";
// import bgimg from "../assets/bg.png";
import { useNavigate } from "react-router";

function Dashboard() {
  const [canvases, setCanvases] = useState([]);
  const [error, setError] = useState("");

  const fetchCanvases = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/canvas", {
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
      const response = await fetch("http://localhost:8000/canvas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
          <button className={classes.button} onClick={handleCreateCanvas}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
