import { BrowserRouter, Routes, Route } from "react-router-dom"


import Canvas from "./pages/CanvasPage"
import Login from "./pages/LoginPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/canvas/:id" element={<Canvas/>}/>
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
