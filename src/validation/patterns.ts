const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;
const phoneRegex =
  /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}(\d{1}(\-)\d{7}|\d{8}))$/;
const platformRegex = /xbox|pc|playstation|nintendo/;
const productStatusRegex = /new|like new|used/;

export { passwordRegex, phoneRegex, platformRegex, productStatusRegex };
