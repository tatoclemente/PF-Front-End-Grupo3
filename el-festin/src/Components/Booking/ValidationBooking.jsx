export default function Validate(inputValues) {
  let errors = {};
  let regex = /^[a-zA-Z\s]*$/;
  let regexPhone = /^\d{1,16}$/;

  if (!inputValues.honoree) {
    errors.homenajeado = "El nombre es obligatorio";
  }
  if (!regex.test(inputValues.honoree)) {
    errors.homenajeado = "Caracteres inválidos";
  }

  if (!regexPhone.test(inputValues.phoneNumber)) {
    errors.phoneNumber = "Número de telefono inválido";
  }
  if (!inputValues.phoneNumber) {
    errors.phoneNumber = "El telefono es obligatorio";
  }

  return errors;
}
