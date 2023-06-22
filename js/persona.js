class Persona {
    constructor(nombre, apellidos, edad, correo, numTel,usuario,password,rol,fotoPerfil){
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._edad = edad;
        this._correo = correo;
        this._numTel = numTel;
        this._usuario = usuario;
        this._password = password;
        this._rol = rol;
        this._fotoPerfil = fotoPerfil;
    }

    get Nombre(){
        return this._nombre;
    }
    set Nombre(nombre){
        this._nombre = nombre;
    }

    get Apellido(){
        return this._apellidos;
    }
    set Apellido(apellidos){
        this._apellidos = apellidos;
    }
    
    get Edad(){
        return this._edad;
    }
    set Edad(edad){
        this._edad = edad;
    }

    get Correo(){
        return this._correo;
    }
    set Correo(correo){
        this._correo = correo;
    }

    get NumTel (){
        return this._numTel;
    }
    set NumTel(numTel){
        this._numTel = numTel;
    }

    get Usuario(){
        return this._usuario;
    }
    set Usuario(usuario){
        this._usuario = usuario;
    }
    
    get Password(){
        return this._password;
    }
    set Password(password){
        this._password = password;
    }

    get Rol(){
        return this._rol;
    }
    set Rol(rol){
        this._rol = rol;
    }
    
    get fotoPerfil(){
        return this._fotoPerfil;
    }
    set fotoPerfil(fotoPerfil){
        this._fotoPerfil = fotoPerfil;
    }

}