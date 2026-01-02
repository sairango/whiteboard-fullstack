import classes from "./DashboardPage.module.css";
// import bgimg from "../assets/bg.png";
import { useNavigate } from "react-router";

function Dashboard() {
  const canvases = [
    { id: 1, title: "firstdashboard" },
    { id: 2, title: "seconddashboard" },
  ];

  const navigate = useNavigate();

  const handleCanvasOpen = (e) => {
    e.preventDefault();
    navigate("/canvas/:id");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>My Canvases</h1>

      <div className={classes.dashboardcontainer}>
        {canvases.map((canvas) => (
          <div key={canvas.id} className={classes.card}>
            <h2 className={classes.cardTitle}>{canvas.title}</h2>
            <button className={classes.button} onClick={handleCanvasOpen}>
              Open
            </button>
          </div>
        ))}

        <div className={classes.card}>
          <h2 className={classes.cardTitle}>Create a New Canvas</h2>
          <button className={classes.button}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
