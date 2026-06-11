export default function ConfirmStatusModal({
  open,
  status,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* ✅ Ícone */}
        <div style={icon}>
          ⚠️
        </div>

        {/* ✅ Título */}
        <h2 style={title}>
          Alterar status?
        </h2>

        {/* ✅ Texto */}
        <p style={message}>
          Deseja realmente alterar o
          pedido para:
        </p>

        <strong style={statusText}>
          {status}
        </strong>

        {/* ✅ Ações */}
        <div style={actions}>
          <button
            style={cancelBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            style={confirmBtn}
            onClick={onConfirm}
          >
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
  backgroundColor:
    "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
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
  marginBottom: "10px",
};

const statusText = {
  display: "block",
  marginBottom: "25px",
  fontSize: "18px",
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
};

const cancelBtn = {
  backgroundColor: "#ccc",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const confirmBtn = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};