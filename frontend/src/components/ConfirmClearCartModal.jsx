export default function ConfirmClearCartModal({
  open,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        
        <h2>🗑 Limpar Carrinho</h2>

        <p>
          Tem certeza que deseja remover todos os itens do carrinho?
        </p>

        <div style={actions}>
          <button
            style={cancelBtn}
            onClick={onCancel}
          >
            ❌ Cancelar
          </button>

          <button
            style={confirmBtn}
            onClick={onConfirm}
          >
            ✅ Confirmar
          </button>
        </div>

      </div>
    </div>
  );
}


// ✅ STYLES
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modal = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  textAlign: "center",
};

const actions = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const cancelBtn = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const confirmBtn = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};