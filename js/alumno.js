class Alumno extends Persona{

    constructor(nombre, apellidos, edad, correo, numTel,usuario,password,rol,fotoPerfil, calificaciones, grupo){
        super(nombre, apellidos, edad, correo, numTel,usuario,password,rol,fotoPerfil);
        this._calificaciones = calificaciones;
        this._grupo = grupo;
    }

    get Calificaciones(){
        return this._calificaciones;
    }
    set Calificaciones(calificaciones){
        this._calificaciones = calificaciones;
    }

    get Grupo(){
        return this._grupo;
    }
    set Grupo(grupo){
        this._grupo = grupo;
    }



}