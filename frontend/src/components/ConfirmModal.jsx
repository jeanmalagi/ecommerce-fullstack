export default function ConfirmModal({
  open,
  title,
  message,
  icon = "⚠️",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={iconStyle}>{icon}</div>

        <h2>{title}</h2>

        <p style={messageStyle}>{message}</p>

        <div style={actions}>
          <button onClick={onCancel} style={cancelBtn}>
            Cancelar
          </button>

          <button onClick={onConfirm} style={confirmBtn}>
            Confirmar
          </button>
        </div>
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
  backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const iconStyle = {
  fontSize: "50px",
  marginBottom: "15px",
};

const messageStyle = {
  marginTop: "12px",
  color: "#666",
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "25px",
};

const cancelBtn = {
  padding: "10px 16px",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
};

const confirmBtn = {
  padding: "10px 16px",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
