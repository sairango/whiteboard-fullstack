import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import Toolbox from "../components/Toolbox";
import BoardProvider from "../store/BoardProvider";
import ToolboxProvider from "../store/ToolboxProvider";
import CanvasHeader from "../components/CanvasHeader";
import { useEffect, useContext } from "react";
import boardContext from "../store/board-context";

function CanvasContent() {
  const { id } = useParams();
  const { loadCanvas } = useContext(boardContext);

  // useEffect(() => {
  //   const fetchCanvas = async () => {
  //     const token = localStorage.getItem("token");

  //     const response = await fetch(`http://localhost:8000/canvas/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) return;
  //     const canvas = await response.json();
  //     loadCanvas(canvas.elements);
  //   };

  //   fetchCanvas();
  // }, [id, loadCanvas]);
  

  return (
    <>
      <Board />
      <Toolbar />
      <CanvasHeader/>
      <Toolbox />
    </>
  );
}

function Canvas() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <CanvasContent/>
      </ToolboxProvider>
    </BoardProvider> 
  );
}

export default Canvas;
