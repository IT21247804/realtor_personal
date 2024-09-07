export const splitPhoneNumber = (number) => {
  const regex = /^(\d{3})(\d{3})(\d+)$/;
  const formattedNumber = number?.replace(regex, "$1 $2 $3");
  return formattedNumber;
};
