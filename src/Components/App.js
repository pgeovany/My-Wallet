import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

export default function App() {
  const [userInfo, setUserInfo] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
