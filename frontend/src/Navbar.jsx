import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ margin: 0 }}>Zigma Employee Page</h2>

      <div style={styles.navButtons}>
        
        {/* 👇 IF USER IS ON FORM PAGE */}
        {location.pathname === "/form" && (
          <button style={styles.btn} onClick={() => navigate("/list")}>
            View List
          </button>
        )}

        {location.pathname === "/list" && (
          <button style={styles.btn} onClick={() => navigate("/form")}>
            Add Employee
          </button>
        )}

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#667eea",
    color: "white"
  },

  navButtons: {
    display: "flex",
    gap: "10px"   
  },

  btn: {
    padding: "8px 12px",
    background: "white",
    color: "#667eea",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "auto"   
  },

  logout: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "auto"
  }
};


export default Navbar;
