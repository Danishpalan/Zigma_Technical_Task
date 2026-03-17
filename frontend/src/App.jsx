import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Form from "./Form";
import List from "./List";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/form"
          element={isLoggedIn ? <Form setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />

        <Route
          path="/list"
          element={isLoggedIn ? <List setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
