const validacionGuar = (input) =>{
    let errors = {};
    if(!input.name){
        errors.name = "El nombre es obligatorio"
    } else if(parseInt(input.name.length) >= 24){
        errors.name = "El nombre no puede tener mas de 24 caracteres"
    } else if(parseInt(input.name.length) < 3){
        errors.name = "El nombre no puede tener menos de 3 caracteres"
    } else if(!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(input.name)){
        errors.name = "El nobre debe tener solo letras"
    }

    if(!input.price){
        errors.price = "El precio es obligatorio"
    } else if(!/^[0-9]+$/.test(input.price)){
        errors.price = "El precio debe ser un numero"
    } else if(parseInt(input.price) < 0){
        errors.price = "El precio no puede ser negativo"
    } else if(parseInt(input.price) > 99999){
        errors.price = "El precio no puede ser mayor a 99999"
    }

    return errors;
}
module.exports = {validacionGuar}