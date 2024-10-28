import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/Signup.jsx";

function App() {
  return (
    <div className="p-4 flex justify-center items-center h-screen">
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
      </Routes>
    </div>
  );
}

export default App;
