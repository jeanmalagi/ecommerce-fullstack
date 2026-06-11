export const formatPrice = (value) => {
  // ✅ Remove tudo que não for número
  const numericValue = value.replace(/\D/g, "");

  // ✅ Converte para centavos
  const amount = Number(numericValue) / 100;

  // ✅ Formata moeda BRL
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

//
// ✅ Converter para backend
//

export const parsePrice = (
  value
) => {
  return Number(
    value
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
};
