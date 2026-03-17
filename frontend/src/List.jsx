import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function List({ setIsLoggedIn }) {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE"
    });

    setEmployees(prev => prev.filter(emp => emp._id !== id));
  };

  const handleEdit = (id) => {
    localStorage.setItem("editId", id);
    navigate("/form");
  };

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div style={styles.wrapper}>
        <div style={styles.tableBox}>
          <h2 style={{ textAlign: "center" }}>Employee List</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.role}</td>
                  <td style={styles.td}>
                    <div style={styles.actionBox}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(emp._id)}
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );


}
const styles = {

  actionBox: {
    display: "flex",
    justifyContent: "center",
    gap: "8px"   
  },
  wrapper: {
    width: "100%",
    padding: "40px"
  },

  tableBox: {
    width: "1000px",  
    margin: "auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#667eea",
    color: "white",
    padding: "12px",
    textAlign: "center"
  },

  td: {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    whiteSpace: "nowrap"   // ✅ THIS FIX
  },


  editBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px"
  },

  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};


export default List;
