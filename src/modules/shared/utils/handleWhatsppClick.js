export const handleWhatsAppClick = (phoneNumber) => {
  window.location.href = `whatsapp://send?phone=${phoneNumber}`;
};
