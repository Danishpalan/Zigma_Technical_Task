import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "./Snackbar";

function Login({ setIsLoggedIn }) {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [snack, setSnack] = useState({
    show: false,
    message: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!data.username || !data.password) {
      setSnack({ show: true, message: "Enter all fields" });
      return;
    }

    if (user?.username === data.username && user?.password === data.password) {
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true); //

      setSnack({ show: true, message: "Login Successful " });

      setTimeout(() => {
        navigate("/form");
      }, 800);
    } else {
      setSnack({ show: true, message: "Invalid Credentials" });
    }
  };

  return (
    <div className="container">
      <h2>Zigma Employee Page</h2>
      <h3>Login</h3>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>

      <p
        onClick={() => navigate("/register")}
        style={{ cursor: "pointer", color: "blue" }}
      >
        New user? Register
      </p>

      <Snackbar
        message={snack.message}
        show={snack.show}
        setShow={(val) => setSnack({ ...snack, show: val })}
      />
    </div>
  );
}

export default Login;
