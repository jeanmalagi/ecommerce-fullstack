import Navbar from "../components/Navbar";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1>✅ Pedido realizado!</h1>

        <p>Obrigado pela sua compra 🙌</p>

        <button
          onClick={() => (window.location.href = "/products")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Voltar para loja
        </button>
      </div>
    </>
  );
}
