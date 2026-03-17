import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "./Snackbar";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [snack, setSnack] = useState({ show: false, message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    if (!user.username || !user.password || !user.confirmPassword) {
      setSnack({ show: true, message: "All fields required" });
      return;
    }

    if (user.password !== user.confirmPassword) {
      setSnack({ show: true, message: "Passwords do not match" });
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      username: user.username,
      password: user.password
    }));

    setSnack({ show: true, message: "Registered Successfully" });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container">
      <h2>Zigma Employee Page</h2>
      <h3>Register</h3>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

      <button onClick={handleRegister}>Register</button>

      <p onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}>
        Already have account? Login
      </p>

      <Snackbar message={snack.message} show={snack.show} setShow={(val) => setSnack({ ...snack, show: val })} />
    </div>
  );
}

export default Register;
