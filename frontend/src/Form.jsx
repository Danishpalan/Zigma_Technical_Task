import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Form({ setIsLoggedIn }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const editId = localStorage.getItem("editId");

    if (editId) {
      fetch(`http://localhost:5000/employees`)
        .then(res => res.json())
        .then(data => {
          const emp = data.find(e => e._id === editId);
          if (emp) setEmployee(emp);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editId = localStorage.getItem("editId");

    if (editId) {
      await fetch(`http://localhost:5000/employees/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });
      localStorage.removeItem("editId");
    } else {
      await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });
    }

    navigate("/list");
  };

  return (
   <>
  <Navbar setIsLoggedIn={setIsLoggedIn} />

  <div style={styles.wrapper}>
    <div style={styles.formBox}>
      <h2>Add / Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={employee.name}
          onChange={(e) =>
            setEmployee({ ...employee, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({ ...employee, email: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Enter Role"
          value={employee.role}
          onChange={(e) =>
            setEmployee({ ...employee, role: e.target.value })
          }
          required
        />

        <button type="submit">Save Employee</button>
      </form>
    </div>
  </div>
</>

  );
}
const styles = {
  wrapper: {
    width: "100%",
    padding: "40px",
    display: "flex",
    justifyContent: "center"
  },

  formBox: {
    width: "600px",   // 👈 BIGGER than login
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  }
};


export default Form;
