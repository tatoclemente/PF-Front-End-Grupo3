export default function Validate(register) {
  let errors = {};
  let regex = /^[a-zA-Z\s]*$/;
  let regexPhone = /^\d{1,14}$/;
  let regexEmail =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;

  if (!regex.test(register.name)) {
    errors.name = "Caracteres inválidos";
  }

  if (register.name.length > 20) {
    errors.name = "El nombre debe tener maximo 20 caracteres";
  }
  if (!regex.test(register.lastName)) {
    errors.lastName = "Caracteres inválidos";
  }
  if (register.lastName.length > 25) {
    errors.lastName = "El apellido debe tener maximo 25 caracteres";
  }
  if (!regexPhone.test(register.phoneNumber)) {
    errors.phoneNumber = "Numero de telefono invalido";
  }
  if (!regexEmail.test(register.email)) {
    errors.email = "Dirección de correo electrónico no válida";
  }
  if (!regexPassword.test(register.password)) {
    errors.password =
      "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito";
  }

  return errors;
}
