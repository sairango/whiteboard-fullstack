import { BrowserRouter, Routes, Route } from "react-router-dom"


import Canvas from "./pages/CanvasPage"
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/canvas/:id" element={<Canvas />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
