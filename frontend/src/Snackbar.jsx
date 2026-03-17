import { useEffect } from "react";

function Snackbar({ message, show, setShow }) {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show]);

  return (
    show && (
      <div style={styles.snackbar}>
        {message}
      </div>
    )
  );
}

const styles = {
  snackbar: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "5px"
  }
};

export default Snackbar;
