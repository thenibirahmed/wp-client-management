const useSubtotal = (invoiceItem) => {
  let subtotal = 0;
  let totalDiscount = 0;
  let totalTax = 0;

  invoiceItem.forEach((item) => {
    const itemSubtotal = item.quantity * item.rate;
    subtotal += itemSubtotal;

    const discountAmount =
      item.discountType === "percent"
        ? (itemSubtotal * item.discount) / 100
        : item.discount;
    totalDiscount += discountAmount;

    const taxAmount =
      item.taxType === "percent"
        ? ((itemSubtotal - discountAmount) * item.tax) / 100
        : item.tax;
    totalTax += taxAmount;
  });

  const finalAmount = subtotal - totalDiscount + totalTax;

  return { subtotal, totalDiscount, totalTax, finalAmount };
};

export default useSubtotal;
