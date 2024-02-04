const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;
const phoneRegex = /^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/;
const platformRegex = /xbox|pc|playstation/;
const productStatusRegex = /new|like new|used/;

export { passwordRegex, phoneRegex, platformRegex, productStatusRegex };
