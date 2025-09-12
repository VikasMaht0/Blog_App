import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Users/Login";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}> </Route> 
      <Route path="/Login" element={<Login/>}></Route>
     
    </Routes>
  </BrowserRouter>
}

export default App
