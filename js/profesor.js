class Profesor extends Persona{
    constructor(nombre, apellidos, edad, correo, numTel,usuario,password,rol,fotoPerfil, grupos){
        super(nombre, apellidos, edad, correo, numTel,usuario,password,rol,fotoPerfil);
        this._grupos = grupos;
    }

    get Grupos(){
        return this._grupos;
    }
    set Grupos(grupos){
        this._grupos = grupos;
    }

}