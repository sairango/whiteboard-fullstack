import BoardProvider from "./store/BoardProvider";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import ToolboxProvider from "./store/ToolboxProvider";
import Toolbox from "./components/Toolbox";

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Board />
        <Toolbar />
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
