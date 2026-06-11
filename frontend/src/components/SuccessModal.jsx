export default function SuccessModal({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={icon}>✅</div>

        <h2>{title}</h2>

        <p style={messageStyle}>{message}</p>

        <button onClick={onClose} style={button}>
          OK
        </button>
      </div>
    </div>
  );
}

//
// ✅ STYLES
//

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "350px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const icon = {
  fontSize: "50px",
  marginBottom: "15px",
};

const messageStyle = {
  marginTop: "10px",
  color: "#666",
};

const button = {
  marginTop: "20px",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};
