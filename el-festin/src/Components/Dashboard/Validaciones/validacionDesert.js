const validacionDesert = ( input ) =>{
    let errors = {};
    if(!input.name){
        errors.name = "El nombre es obligatorio"
    } else if(parseInt(input.name.length) >= 24){
        errors.name = "El nombre no puede tener mas de 24 caracteres"
    } else if(parseInt(input.name.length) < 3){
        errors.name = "El nombre no puede tener menos de 3 caracteres"
    } else if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(input.name)){
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

    if(!input.stock){
        errors.stock = "El stock es obligatorio"
    } else if (!/^[0-9]+$/.test(input.stock)){
        errors.stock = "El stock debe ser un numero"
    } else if(parseInt(input.stock) < 0){
        errors.stock = "El stock no puede ser negativo"
    } else if(parseInt(input.stock) > 100){
        errors.stock = "El stock no puede ser mayor a 100"
    }


    return errors;
    
} 

module.exports = {validacionDesert};