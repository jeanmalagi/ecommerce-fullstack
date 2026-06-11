export default function ErrorModal({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={iconStyle}>❌</div>

        {/* ✅ Título */}
        <h2 style={titleStyle}>{title}</h2>

        {/* ✅ Mensagem */}
        <p style={messageStyle}>{message}</p>

        {/* ✅ Botão */}
        <button style={button} onClick={onClose}>
          Fechar
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
  zIndex: 9999,
};

const modal = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const iconStyle = {
  fontSize: "50px",
  marginBottom: "15px",
};

const titleStyle = {
  marginBottom: "10px",
};

const messageStyle = {
  color: "#666",
  marginBottom: "25px",
  lineHeight: 1.5,
};

const button = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
