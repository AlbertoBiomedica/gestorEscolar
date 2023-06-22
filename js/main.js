// Introducir datos de alumnos y sus calificaciones
/* 
Poder introducir datos del alumno (Nombre, Apellidos, Edad, Materias inscritas, Calificaciones)
Dar de alta a Alumnos
Inscribir a un alumno en una clase / materia
Asignarle sus calificaciones
Crear grupos (de acuero a la materia) y asignarle alumnos (estructura de datos)
Poder buscar por nombre o apellido
Obtener el promedio de un alumno
Obtener el promedio de un grupo
Lista de alumnos ordenados ascendente y descendiente o por calificacion
*/

//Variables globales de almacenamiento y manejo de datos
const url = window.location.href;
const url2 = url.split("/");
var contador;
var materias = [];
var usuarios = [];
var tablaGrupoP = [];
var tablaAlumnos = [];
var alumnosInscritos = [];
var alumnosCalificados = [];

let admin = new Persona("Juan", "Lopez Loriga", "36", "admin.admin@gmail.com", "5563652150", "admin", "admin", "administrador");
let admin2 = new Persona("Alejandro", "Lopez Ramirez", "36", "admin.admin@gmail.com", "5563652150", "admin2", "admin2", "administrador");


let nameSesion = document.getElementById("nameSesion");
let padreName = document.getElementById("padreName");
let fotoPerfil = document.getElementById("fotoPerfil");
let padreGrupo = document.getElementById("padreGrupos");
let padreOptions = document.getElementById("seleccionGrupo");
let buscarGrupo = document.getElementById("buscarGrupo");
let buscarAlumno = document.getElementById("buscarAlumno");
let bloqueBusquedaA = document.getElementById("bloqueBusquedaA");

//Variables para ver datos del alumno
let nameA = document.getElementById("nameUser");
let appUserA = document.getElementById("appUserA");
let edadUserA = document.getElementById("edadUserA");
let emailUA = document.getElementById("emailA");
let celUS = document.getElementById("numCel");
let gpoA = document.getElementById("gpoA");
let matUA = document.getElementById("mateA");
let calUA = document.getElementById("calA");
//Botones para activar eventos 
let btnInicio = document.getElementById("inicioSesion");
let btnRegistroP = document.getElementById("registrarProfesor");
let btnCerrarSesion = document.getElementById("cerreSesion");
let btnCargarProfesores = document.getElementById("rolRM");
let btnRegistrarMateria = document.getElementById("registrarMateria");
let btnCargarMaterias = document.getElementById("rolRG");
let btnBuscaraProfesor = document.getElementById("btnBuscarP");
let btnAgregarMateria = document.getElementById("btnAgregarM");
let btCargarProfessorMateria = document.getElementById("rolRGP");
let btnInscribirAG = document.getElementById("btnInscribir");
let btnBuscarGA = document.getElementById("btnBuscarG");
let btnBuscarUA = document.getElementById("btnBuscarUA");
let btnCalAlum = document.getElementById("btnCalAlumno");

//Variables de los formularios
let formInicio = document.getElementById("formInicio");
let formRegistroP = document.getElementById("formRegistroProfesor");
let formRegistroM = document.getElementById("formRegistroMateria");
let formRegistroG = document.getElementById("formRegistroGrupo");
let formModalA = document.getElementById("formVerAlumnos");
let formModalCal = document.getElementById("formModalA");

//Variables para iniciar sesion
let user = document.getElementById("user");
let password = document.getElementById("password");

//Variables para el registro de profesores
let usuarioPN = document.getElementById("userR");
let passwordPN = document.getElementById("passwordR");
let nombrePN = document.getElementById("nombreR");
let apellidosPN = document.getElementById("apellidosR");
let edadPN = document.getElementById("edadR");
let correoPN = document.getElementById("correoR");
let numTelPN = document.getElementById("numTelR");
let rolPN = document.getElementById("rolR");
let fotoR = document.getElementById("fotoR");

//Variables para registrar materias
let nombreMateria = document.getElementById("nombreRM");

//Variables para registrar grupos
let nombreGrupo = document.getElementById("nombreG");
let panelBuscarProfesor = document.getElementById("buscarProfesor");
let tablaGrupo = document.getElementById("tablaGrupo");

let tablaAlumnosA = document.getElementById("tablaAlumnosInscritos");



if (localStorage.getItem("users") === null) {
    usuarios.push(admin);
    usuarios.push(admin2);
    localStorage.setItem("users", JSON.stringify(usuarios));
}
if (localStorage.getItem("contador") === null) {
    contador = 1;
}
if (tablaGrupo !== null) {
    let tabla = Array.from(JSON.parse(localStorage.getItem("tablaGrupoP")));
    crearTabla(tabla);
}

//Codiciones de Paneles de control dependiendo del rol del usuario
if (url2[3] === "alumno.html") {
    extraerDatosSesion();
} else if (url2[3] === "profesor.html") {
    extraerDatosSesion();
} else if (url2[3] === "login.html") {

} else if (url2[3] === "index.html") {
    extraerDatosSesion();
}
else {
    extraerDatosSesion();
}


//Eventos
//Evento para inicar sesion
if (btnInicio) {
    btnInicio.addEventListener("click", (event) => {
        event.preventDefault();
        usuarios = Array.from(JSON.parse(localStorage.getItem("users")));

        let usuario = usuarios.find((element) => {
            if (element._usuario === user.value) {
                return element;
            }
        })
        if (usuario._usuario === user.value && usuario._password === password.value) {
            console.log(usuario);
            localStorage.setItem("sesion", JSON.stringify(usuario));

            if (usuario._rol === "Admistrador" || usuario._rol === "administrador") {
                window.location.href = "http://127.0.0.1:5500/index.html";
            } else if (usuario._rol === "Profesor") {
                window.location.href = "http://127.0.0.1:5500/profesor.html";
            } else if (usuario._rol === "Alumno") {
                window.location.href = "http://127.0.0.1:5500/alumno.html";
            }

        } else {
            alert("El usuario o la contraseña no son correctas");
            if (usuario === undefined || usuario === null) {
                alert("El usuario ingresado no existe");
            }
        }

    });
}
//Evento para registrar nuevos usuarios
if (btnRegistroP) {
    if (localStorage.getItem("users") !== null) {
        usuarios = Array.from(JSON.parse(localStorage.getItem("users")));
    }
    //Registro de usuarioos
    btnRegistroP.addEventListener("click", (event) => {
        event.preventDefault();
        let rol = "";
        let usuarioR;
        if (parseInt(rolPN.value) === 1) {
            rol = "Admistrador"
            usuarioR = new Persona(nombrePN.value, apellidosPN.value, edadPN.value, correoPN.value, numTelPN.value, usuarioPN.value, passwordPN.value, rol, fotoR.value);
        } else if (parseInt(rolPN.value) === 2) {
            rol = "Profesor"
            usuarioR = new Profesor(nombrePN.value, apellidosPN.value, edadPN.value, correoPN.value, numTelPN.value, usuarioPN.value, passwordPN.value, rol, fotoR.value);
        } else if (parseInt(rolPN.value) === 3) {
            rol = "Alumno";
            usuarioR = new Alumno(nombrePN.value, apellidosPN.value, edadPN.value, correoPN.value, numTelPN.value, usuarioPN.value, passwordPN.value, rol, fotoR.value);
        }
        usuarios.push(usuarioR);
        localStorage.setItem("users", JSON.stringify(usuarios));
        formRegistroP.reset();
        alert(" Registro exitoso");
    })
}
//Evento para cerrar sesion
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "http://127.0.0.1:5500/login.html";
    })
}
//Evento para cargar profesores
if (btnCargarProfesores) {
    btnCargarProfesores.addEventListener("click", cargarProfesores)
}
function cargarProfesores(event) {
    event.target.removeEventListener(event.type, cargarProfesores);
    let profesores = Array.from(JSON.parse(localStorage.getItem("users")));
    for (let i = 0; i < profesores.length; i++) {
        if (profesores[i]._rol === "Profesor") {
            const option = document.createElement('option');
            const valor = profesores[i]._usuario;
            const valor1 = profesores[i]._nombre + " " + profesores[i]._apellidos;
            option.value = valor;
            option.text = valor1;
            btnCargarProfesores.appendChild(option);
        }
    }
}
//Evento para registrar materias.
if (btnRegistrarMateria) {
    btnRegistrarMateria.addEventListener("click", (event) => {
        event.preventDefault();
        if (localStorage.getItem("users") !== null) {
            materias = Array.from(JSON.parse(localStorage.getItem("materia")));
        }

        materias.push({ id: btnCargarProfesores.value, nombre: nombreMateria.value });
        localStorage.setItem("materia", JSON.stringify(materias));
        console.log(materias);
        alert("Has registrado una materia con exito");
        formRegistroM.reset();
    })
}

//Evento para cargar materias
if (btnCargarMaterias) {
    btnCargarMaterias.addEventListener("click", cargarMaterias)
}
function cargarMaterias(event) {
    event.target.removeEventListener(event.type, cargarMaterias);
    let materias_ = Array.from(JSON.parse(localStorage.getItem("materia")));
    const busqueda = buscarElementos(materias_);
    let filtroMaterias = Object.keys(busqueda);

    for (let i = 0; i < filtroMaterias.length; i++) {
        const option = document.createElement('option');
        const valor = filtroMaterias[i];
        const valor1 = filtroMaterias[i];
        option.value = valor;
        option.text = valor1;
        btnCargarMaterias.appendChild(option);
    }
    btnBuscaraProfesor.addEventListener("click", cargarMateriasProfesores);

}

function cargarMateriasProfesores(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    while (btCargarProfessorMateria.firstChild) {
        btCargarProfessorMateria.removeChild(btCargarProfessorMateria.firstChild);
    }

    panelBuscarProfesor.style.display = "block";
    let materias_ = Array.from(JSON.parse(localStorage.getItem("materia")));
    let filtroProfesor = materias_.filter((proefesor) => {
        return proefesor.nombre === btnCargarMaterias.value;
    })

    let profesores = Array.from(JSON.parse(localStorage.getItem("users")));

    //seccion para buscar user especifico
    let acumuladorDatosProfesor = [];
    for (let i = 0; i < filtroProfesor.length; i++) {
        let filtroUser = profesores.find((user) => {
            return user._usuario === filtroProfesor[i].id;
        });
        acumuladorDatosProfesor.push(filtroUser);
    }

    const option = document.createElement('option');
    const valor1 = "Seleccionar";
    option.text = valor1;
    btCargarProfessorMateria.appendChild(option);

    for (let i = 0; i < acumuladorDatosProfesor.length; i++) {
        const option = document.createElement('option');
        const valor = acumuladorDatosProfesor[i]._usuario;
        const valor1 = acumuladorDatosProfesor[i]._nombre + " " + acumuladorDatosProfesor[i]._apellidos;
        option.value = valor;
        option.text = valor1;
        btCargarProfessorMateria.appendChild(option);
    }
}

if (btnAgregarMateria) {
    btnAgregarMateria.addEventListener("click", (event) => {
        event.preventDefault();
        let users_ = Array.from(JSON.parse(localStorage.getItem("users")));
        let filtroUser = users_.find((user) => {
            return user._usuario === btCargarProfessorMateria.value;
        });
        contador = 1;
        if (localStorage.getItem("contador") !== null) {
            contador = localStorage.getItem("contador");
        }
        if (localStorage.getItem("tablaGrupoP") !== null) {
            console.log(localStorage.getItem("tablaGrupoP"));
            tablaGrupoP = Array.from(JSON.parse(localStorage.getItem("tablaGrupoP")));
        }

        let row = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = contador;
        let dato2 = document.createElement("td");
        dato2.innerHTML = filtroUser._nombre;
        let dato3 = document.createElement("td");
        dato3.innerHTML = filtroUser._apellidos;
        let dato4 = document.createElement("td");
        dato4.innerHTML = btnCargarMaterias.value;
        let dato5 = document.createElement("td");
        dato5.innerHTML = nombreGrupo.value;
        row.appendChild(dato1);
        row.appendChild(dato2);
        row.appendChild(dato3);
        row.appendChild(dato4);
        row.appendChild(dato5);
        tablaGrupo.appendChild(row);
        let tabla = {
            id: contador, userP: filtroUser._usuario, nombre: filtroUser._nombre, apellidos: filtroUser._apellidos, materia: btnCargarMaterias.value, grupo: nombreGrupo.value
        }
        console.log(tabla);
        tablaGrupoP.push(tabla);
        console.log(tablaGrupoP);
        localStorage.setItem("tablaGrupoP", JSON.stringify(tablaGrupoP));
        contador++;
        localStorage.setItem("contador", contador);
        formRegistroG.reset();


    })
}

//Inscribe un alumno a un grupo 
if (url2[3] === "inscribirse.html") {
    let gruposA = Array.from(JSON.parse(localStorage.getItem("tablaGrupoP")));
    const busqueda = gruposA.reduce((acumulador, grupo) => {
        acumulador[grupo.grupo] = ++acumulador[grupo.grupo] || 0;
        return acumulador;
    }, {});

    let filtroGrupos = Object.keys(busqueda);
    console.log(filtroGrupos.sort())

    for (let i = 0; i < filtroGrupos.length; i++) {
        const element = document.createElement("div");
        element.classList.add("container");
        element.innerHTML =
            `<div class="col-sm-12 mb-3 mb-sm-4 w-75">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${filtroGrupos[i]}</h5>
                        <table class="table" >
                            <thead>
                                <tr>
                                <th scope="col" colspan="2">Profesor asignado</th>
                                <th scope="col">Materia</th>
                                </tr>
                            </thead>
                            <tbody id= "tableGroupA${i}">
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        `;
        padreGrupo.appendChild(element);
    }

    for (let i = 0; i < filtroGrupos.length; i++) {
        const options = document.createElement("option");
        console.log(filtroGrupos[i]);
        options.value = filtroGrupos[i];
        options.text = filtroGrupos[i];
        padreOptions.appendChild(options);
    }

    for (let i = 0; i < gruposA.length; i++) {
        for (let j = 0; j < filtroGrupos.length; j++) {
            if (gruposA[i].grupo === filtroGrupos[j]) {
                let tableGroupA = document.getElementById("tableGroupA" + j);
                const element2 = document.createElement("tr");
                const data2 = document.createElement("td");
                data2.setAttribute("colspan", "2");
                const data4 = document.createElement("td");
                data2.innerHTML = gruposA[i].nombre + " " + gruposA[i].apellidos;
                data4.innerHTML = gruposA[i].materia;
                element2.appendChild(data2);
                element2.appendChild(data4);
                tableGroupA.appendChild(element2);
            }
        }
    }

    btnInscribirAG.addEventListener("click", (event) => {
        event.preventDefault();

        let filtroGrupo = gruposA.filter((grupo) => {
            return grupo.grupo === padreOptions.value;
        });
        let usuarioActual = JSON.parse(localStorage.getItem("sesion"));
        console.log(usuarioActual)

        let usuarioRegistrado = { user: usuarioActual, grupo: filtroGrupo };

        if (localStorage.getItem("inscritoGA") !== null) {
            alumnosInscritos = [...JSON.parse(localStorage.getItem("inscritoGA"))];
            for (let i = 0; i < alumnosInscritos.length; i++) {
                if (alumnosInscritos[i].user._usuario === usuarioActual._usuario) {
                    alert("Ya te has incrito a un grupo");
                    return
                }
            }
        }

        alumnosInscritos.push(usuarioRegistrado);
        localStorage.setItem("inscritoGA", JSON.stringify(alumnosInscritos));
        alert("Te has incrito correctamente");
    })


}

//Visualiza los alumnos asignados a un profesor
if (url2[3] === "alumnosAsignados.html") {
    let alumnosInscritos = [...JSON.parse(localStorage.getItem("inscritoGA"))];

    let usuarioActual = JSON.parse(localStorage.getItem("sesion"));

    let alumnosEncontrados = [];
    // if (localStorage.getItem("AlumnosEncontrados") !== null) {
    //     alumnosEncontrados = [... JSON.parse(localStorage.getItem("AlumnosEncontrados"))];
    // }
    //console.log(alumnosInscritos)
    for (let i = 0; i < alumnosInscritos.length; i++) {
        let aux = [...alumnosInscritos[i].grupo];
        for (let j = 0; j < aux.length; j++) {
            if (alumnosInscritos[i].grupo[j].userP === usuarioActual._usuario) {
                const alumno =
                {
                    userA: alumnosInscritos[i].user._usuario,
                    nombre: alumnosInscritos[i].user._nombre,
                    apellidos: alumnosInscritos[i].user._apellidos,
                    userP: alumnosInscritos[i].grupo[j].userP,
                    grupo: alumnosInscritos[i].grupo[j].grupo,
                    materia: alumnosInscritos[i].grupo[j].materia,
                    cal: 0
                }
                alumnosEncontrados.push(alumno);
            }
        }
    }

    localStorage.setItem("AlumnosEncontrados", JSON.stringify(alumnosEncontrados));

    let gruposA = Array.from(JSON.parse(localStorage.getItem("tablaGrupoP")));
    const busqueda = gruposA.reduce((acumulador, grupo) => {
        acumulador[grupo.grupo] = ++acumulador[grupo.grupo] || 0;
        return acumulador;
    }, {});

    let filtroGrupos = Object.keys(busqueda);
    console.log(filtroGrupos.sort());

    for (let i = 0; i < filtroGrupos.length; i++) {
        const options = document.createElement("option");
        options.value = filtroGrupos[i];
        options.text = filtroGrupos[i];
        buscarGrupo.appendChild(options);
    }

    buscarGrupo.addEventListener("change", () => {
        btnBuscarGA.addEventListener("click", () => {
            bloqueBusquedaA.style.display = "block";
            while (buscarAlumno.firstChild) {
                buscarAlumno.removeChild(buscarAlumno.firstChild);
            }
            let filtroAlumnos = alumnosEncontrados.filter((filtro) => {
                console.log(filtro.grupo);
                return filtro.grupo === buscarGrupo.value;
            })
            const options = document.createElement("option");
            options.text = "Seleccionar";
            buscarAlumno.appendChild(options);
            for (let i = 0; i < filtroAlumnos.length; i++) {
                const options = document.createElement("option");
                options.value = filtroAlumnos[i].userA;
                options.text = filtroAlumnos[i].nombre + " " + filtroAlumnos[i].apellidos;
                buscarAlumno.appendChild(options);
            }
        })
    })

    buscarAlumno.addEventListener("change", () => {
        btnBuscarUA.addEventListener("click", () => {
            // console.log(buscarAlumno.value);
            let usuarios = [...JSON.parse(localStorage.getItem("users"))];
            let usuarios2;
            if(localStorage.getItem("alumnosCalificados") === null){
                usuarios2 = [...JSON.parse(localStorage.getItem("AlumnosEncontrados"))];
            }
            usuarios2 = [...JSON.parse(localStorage.getItem("alumnosCalificados"))];
            console.log(usuarios);
            let usuarioActual = usuarios.find((usuario) => {
                return usuario._usuario === buscarAlumno.value;
            });
            let usuarioActual2 = usuarios2.find((usuario) => {
                return usuario.userA === buscarAlumno.value;
            })
            
            console.log(usuarios2)

            nameA.value = usuarioActual._nombre;
            appUserA.value = usuarioActual._apellidos;
            edadUserA.value = usuarioActual._edad;
            emailUA.value = usuarioActual._correo
            celUS.value = usuarioActual._numTel;
            gpoA.value = usuarioActual2.grupo;
            matUA.value = usuarioActual2.materia;

            btnCalAlum.addEventListener("click", () => {

                let contador3 = 0;
                for (let i = 0; i < usuarios2.length; i++) {
                    if (usuarios2[i].userA === usuarioActual._usuario) {
                        break;
                    }
                    contador3++;
                }
                console.log(contador3);
                const actualizarUser = {
                    userA: usuarioActual._usuario,
                    nombre: usuarioActual._nombre,
                    apellidos: usuarioActual._apellidos,
                    userP: usuarioActual2.grupo,
                    grupo: usuarioActual2.grupo,
                    materia: usuarioActual2.materia,
                    cal: calUA.value
                }
                usuarios2[contador3] = actualizarUser;

                localStorage.setItem("alumnosCalificados", JSON.stringify(usuarios2));
                while (tablaAlumnosA.firstChild) {
                    tablaAlumnosA.removeChild(tablaAlumnosA.firstChild);
                }
                alumnosCalificados = [...JSON.parse(localStorage.getItem("alumnosCalificados"))]
                for (let i = 0; alumnosCalificados.length; i++) {
                    let row = document.createElement("tr");
                    let dato1 = document.createElement("td");
                    dato1.innerHTML = i + 1;
                    let dato2 = document.createElement("td");
                    dato2.innerHTML = alumnosCalificados[i].nombre;
                    let dato3 = document.createElement("td");
                    dato3.innerHTML = alumnosCalificados[i].apellidos;
                    let dato4 = document.createElement("td");
                    dato4.innerHTML = alumnosCalificados[i].materia;
                    let dato5 = document.createElement("td");
                    dato5.innerHTML = alumnosCalificados[i].grupo;
                    let dato6 = document.createElement("td");
                    dato6.classList.add("text-center");
                    dato6.innerHTML = alumnosCalificados[i].cal;
                    row.appendChild(dato1);
                    row.appendChild(dato2);
                    row.appendChild(dato3);
                    row.appendChild(dato4);
                    row.appendChild(dato5);
                    row.appendChild(dato6);
                    tablaAlumnosA.appendChild(row);
                }


                alert("Ha agregado la calificación con exito");
                formModalCal.reset();
                formModalA.reset();
            })
            console.log(usuarioActual);
        })

    })

    console.log(alumnosEncontrados);
    alumnosCalificados = [...JSON.parse(localStorage.getItem("alumnosCalificados"))]
    for (let i = 0; alumnosCalificados.length; i++) {
        let row = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = i + 1;
        let dato2 = document.createElement("td");
        dato2.innerHTML = alumnosCalificados[i].nombre;
        let dato3 = document.createElement("td");
        dato3.innerHTML = alumnosCalificados[i].apellidos;
        let dato4 = document.createElement("td");
        dato4.innerHTML = alumnosCalificados[i].materia;
        let dato5 = document.createElement("td");
        dato5.innerHTML = alumnosCalificados[i].grupo;
        let dato6 = document.createElement("td");
        dato6.classList.add("text-center");
        dato6.innerHTML = alumnosCalificados[i].cal;
        row.appendChild(dato1);
        row.appendChild(dato2);
        row.appendChild(dato3);
        row.appendChild(dato4);
        row.appendChild(dato5);
        row.appendChild(dato6);
        tablaAlumnosA.appendChild(row);
    }
}
//let table = new DataTable('#myTable');


//Funciones auxiliares 
//Función para extraer los datos del usuario que inicia sesión
function extraerDatosSesion() {
    let usuarioSesion = JSON.parse(localStorage.getItem("sesion"));
    const foto = usuarioSesion._fotoPerfil;
    const urlFoto = foto.split("\\");
    nameSesion.innerHTML = usuarioSesion._nombre + " " + usuarioSesion._apellidos;
    fotoPerfil.src = `./img/${urlFoto[2]} `
}
//Función para crear tablas 
function crearTabla(tabla) {
    for (let i = 0; i < tabla.length; i++) {
        let row = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = tabla[i].id;
        let dato2 = document.createElement("td");
        dato2.innerHTML = tabla[i].nombre;
        let dato3 = document.createElement("td");
        dato3.innerHTML = tabla[i].apellidos;
        let dato4 = document.createElement("td");
        dato4.innerHTML = tabla[i].materia;
        let dato5 = document.createElement("td");
        dato5.innerHTML = tabla[i].grupo;
        row.appendChild(dato1);
        row.appendChild(dato2);
        row.appendChild(dato3);
        row.appendChild(dato4);
        row.appendChild(dato5);
        tablaGrupo.appendChild(row);
    }
}
//Funcion para buscar elmentos
function buscarElementos(array) {
    const busqueda = array.reduce((acumulador, elemento) => {
        acumulador[elemento.nombre] = ++acumulador[elemento.nombre] || 0;
        return acumulador;
    }, {});
    return busqueda;
}

//para ver los duplicados
    // const duplicados = materias_.filter((materia) => {
    //     return busqueda[materia.nombre];
    // }); console.log(duplicados)