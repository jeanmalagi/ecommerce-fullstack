export default function StockErrorModal({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={icon}>⚠️</div>

        {/* ✅ Título */}
        <h2 style={title}>Estoque insuficiente</h2>

        {/* ✅ Mensagem */}
        <p style={messageStyle}>{message}</p>

        {/* ✅ Botão */}
        <button style={button} onClick={onClose}>
          Entendi
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
  padding: "35px",
  borderRadius: "14px",
  width: "90%",
  maxWidth: "420px",
  textAlign: "center",
};

const icon = {
  fontSize: "55px",
  marginBottom: "15px",
};

const title = {
  marginBottom: "10px",
};

const messageStyle = {
  color: "#666",
  marginBottom: "25px",
  lineHeight: 1.5,
};

const button = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "14px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
