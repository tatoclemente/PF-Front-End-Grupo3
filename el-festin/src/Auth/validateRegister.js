export default function Validate(form, pokemons) {
  let errors = {};
  let regex = /^[a-zA-Z\s]*$/;
  let regexPhone = /^\+\d{8,11}$/;
  let regexEmail =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;

  // Validar que solo se le pasen al input caracteres especificos
  if (!regex.test(form.name)) {
    errors.name = "Caracteres inválidos";
  }
  //Validamos que sea un nombre corto no tenga espacios
  if (form.name.length > 15) {
    errors.name = "El nombre debe tener maximo 15 caracteres";
  }
  if (!regex.test(form.lastName)) {
    errors.lastName = "Caracteres inválidos";
  }
  if (form.lastName.length > 15) {
    errors.lastName = "El apellido debe tener maximo 15 caracteres";
  }
  if (!regexPhone.test(phoneNumber)) {
    errors.phoneNumber = "Numero de telefono invalido";
  }
  if (!regexEmail.test(email)) {
    errors.email = "Dirección de correo electrónico no válida";
  }
  if (!regexPassword.test(password)) {
    errors.password =
      "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito";
  }

  return errors;
}
