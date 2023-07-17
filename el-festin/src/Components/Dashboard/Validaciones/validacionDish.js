const validacionDish = (input) =>{

    let errors = {};
    if(!input.name){
        errors.name = "El nombre es obligatorio"
    } else if(parseInt(input.name.length) >= 24){
        errors.name = "El nombre no puede tener mas de 24 caracteres"
    } else if(parseInt(input.name.length) < 3){
        errors.name = "El nombre no puede tener menos de 3 caracteres"
    } else if(!/[A-Z]+$/i.test(input.name)){
        errors.name = "El nobre debe tener solo letras"
    }

    if(!input.description){
        errors.description = "La descripcion es obligatoria"
    } else if(parseInt(input.description.length) >= 150){
        errors.description = "La descripcion no puede tener mas de 150 caracteres"
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

    if(!input.calories){
        errors.calories = "Los calorias son obligatorias"
    }else if(!/^[0-9]+$/.test(input.calories)){
        errors.calories = "Los calorias deben ser un numero"
    }else if(parseInt(input.calories) < 0){
        errors.calories = "Los calorias no pueden ser negativos"
    } else if(parseInt(input.calories) > 650){
        errors.calories = "Los calorias no pueden ser mayor a 650"
    }

    return errors;
}

module.exports = {validacionDish} ;
 

