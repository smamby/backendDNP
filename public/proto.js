class Persona {
    constructor ({
        nombre,
        apellido,
        dni,
        cbu,
        celular,
        email, 
    }){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.cbu = cbu;
        this.celular = celular;
        this.email = email;   
    }
}
class Propietario extends Persona {
    constructor(nombre,apellido,celular,email,dni,cbu,direccionP){
        super(nombre,apellido,celular,email,dni,cbu);
        this.direccionP = direccionPInput;
    }    
}
class Inquilino extends Persona {
    constructor(nombre,apellido,celular,email,dni,cbu,garantia){
        super(nombre,apellido,celular,email,dni,cbu);
        this.garantia = garantiaIInput;
    }
}

class Deptos{
    constructor({   
        id,
        direccion = "",
        propietario = propietarioOb.nombre+' '+propietarioOb.apellido,
        inquilino = inquilinoOb.nombre+' '+inquilinoOb.apellido,
        inicioContrato = "",
        inicioContratoHISP = this.fechaHISP(inicioContrato),
        valor1 = 0,
        inicioP2 = this.calculoValor2(inicioContrato),
        valor2 = 0,
        inicioP3 = this.calculoValor3(inicioContrato),
        valor3 = 0,
        renovacion = this.calculoRenovacion(inicioContrato),
        obligacionesInq = "",
        descripcion = "",
        imagenes = [],
        observaciones = "",
        contrato = [],
        comision = 0,
    } = {}) {
        this.id=id; 
        this.direccion = direccion; 
        this.propietario = propietario; 
        this.inquilino = inquilino; 
        this.inicioContrato = inicioContrato;
        this.inicioContratoHISP = inicioContratoHISP;
        this.valor1 = valor1; 
        this.inicioP2 = inicioP2;
        this.valor2 = valor2; 
        this.inicioP3 = inicioP3;
        this.valor3 = valor3; 
        this.renovacion = renovacion; 
        this.obligacionesInq = obligacionesInq; 
        this.descripcion = descripcion; 
        this.imagenes = imagenes; 
        this.observaciones = observaciones;
        this.contrato = contrato;
        this.comision = comision;
    };
    get _id() {return this.id};
    set _id(newId) {this.id = newId};
    get direccion() {return this.direccion};
    //set direccion(crearDireccion) {this.direccion = crearDireccion};
    get propietario() {return this.propietario}; 
    get inquilino() {return this.inquilino}; 
    set inquilino(nuevoInquilino) { this.inquilino = nuevoInquilino};
    get inicioContrato() {return this.inicioContrato}; 
    get inicioContratoHISP() {return this.inicioContratoHISP};   
    //set inicioContrato(dateInicioContrato) {this.inicioContrato = dateInicioContrato};
    get valor1() {return this.valor1};
    //set valor1(nuevoValor) {this.valor1 = nuevoValor};
    get valor2() {return this.valor2};
    set valor2(nuevoValor) {
        if(nuevoValor>=0){
            this.valor2 = nuevoValor;
        } else {
            alert('El valor tiene que ser positivo');
        };
    };
    get valor3() {return this.valor3};
    set valor3(nuevoValor) {
        if(nuevoValor>=0){
            this.valor3 = nuevoValor;
        } else {
            alert('El valor tiene que ser positivo');
        };};
    get renovacion() {return this.renovacion};
    //set renovacion(nuevaFecha) {this.renovacion = calculoRenovacion(nuevaFecha)};
    get obligacionesInq() {return this.obligacionesInq};
    //set obligacionesInq(cambiarObligacion) {this.obligacionesInq = cambiarObligacion};
    get descripcion() {return this.descripcion};
    set descripcion(cambiarDescripcion) {this.descripcion = cambiarDescripcion};
    get imagenes() {return this.imagenes};
    get observaciones() {return this.observaciones};
    set observaciones(cambiarObservaciones) {this.observaciones = cambiarObservaciones};
    get contrato() {return this.contrato};
    get comision() {return this.comision};
       
    calculoRenovacion(date){
        return calculoFecha(date,3)
    }
    fechaHISP(date){
        return calculoFecha(date,0)
    }
    calculoValor2(date){
        return calculoFecha(date,1)
    }
    calculoValor3(date){
        return calculoFecha(date,2)        
    }
    cargarImg(file) {
        this.imagenes.push(file)
    }
    cargarContrato(file) {
        this.contrato.push(file)
    }
}

// document.querySelector('#sumarObligaciones').addEventListener('click',sumarOb)
// var obligaciones_Inquilino = ['Expensas Ord.'];
// function sumarOb(){    
//     obligacionesInqInput = document.getElementById("obligacionesInq").value;
//     obligaciones_Inquilino.push(obligacionesInqInput);
//     console.log(obligaciones_Inquilino);
//     //obligacionesInqIn = [...obligaciones_Inquilino];
//     //console.log(obligacionesInqIn); 
//     document.getElementById("obligacionesInq").value = '';
//     var alText = ''
//     for(item of obligaciones_Inquilino){
//         alText += item+', '
//     }
//     alert('Obligaciones del inquilino: ' + alText)  
//  }

function calculoFecha(date,y) {
    console.log(date)
    let parseDate = Date.parse(date)
    console.log(parseDate);
    let objDate = new Date(parseDate)
    var newDate = objDate.setFullYear(objDate.getFullYear() + y);
    var fechaFinal = new Date(newDate);
    console.log(fechaFinal)
    const optionDate = {year:'numeric',month:'numeric',day:'numeric'};
    var stringFecha = fechaFinal.toLocaleDateString("hi-IN",optionDate);
    console.log(stringFecha);
    return stringFecha;
};
//  function calculoRenovacion(date){
//     calculoFecha(date,3)
//  }
//  function calculoValor2(date){
//     calculoFecha(date,1)
//  }
//  function calculoValor3(date){
//     calculoFecha(date,2)
//  }


//module.exports = proto