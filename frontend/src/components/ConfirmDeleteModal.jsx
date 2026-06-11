export default function ConfirmDeleteModal({
  open,
  productName,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={icon}>🗑️</div>

        {/* ✅ Título */}
        <h2 style={title}>Remover produto?</h2>

        {/* ✅ Mensagem */}
        <p style={message}>
          Deseja realmente remover <strong>{productName}</strong> do carrinho?
        </p>

        {/* ✅ Botões */}
        <div style={actions}>
          <button style={cancelBtn} onClick={onCancel}>
            Cancelar
          </button>

          <button style={confirmBtn} onClick={onConfirm}>
            Remover
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

const message = {
  color: "#666",
  marginBottom: "25px",
  lineHeight: 1.5,
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const cancelBtn = {
  backgroundColor: "#ccc",
  color: "#000",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const confirmBtn = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
