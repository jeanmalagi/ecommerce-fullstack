export default function OrderSuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={icon}>✅</div>

        {/* ✅ Título */}
        <h2 style={title}>Pedido realizado!</h2>

        {/* ✅ Mensagem */}
        <p style={message}>Seu pedido foi finalizado com sucesso 🎉</p>

        {/* ✅ Botão */}
        <button style={button} onClick={onClose}>
          Continuar comprando
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
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

const icon = {
  fontSize: "60px",
  marginBottom: "15px",
};

const title = {
  marginBottom: "10px",
};

const message = {
  color: "#666",
  marginBottom: "25px",
  lineHeight: 1.5,
};

const button = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "14px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
