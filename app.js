document.addEventListener('DOMContentLoaded', function() {

    const formulario=document.querySelector('.form-register');
    const nombreInput=document.querySelector('#nombre');
    const apellidoInput=document.querySelector('#apellidos');
    const emailInput=document.querySelector('#correo');
    const asignaturaInput=document.querySelector('#asignatura');
    const notaInput=document.querySelector('#nota');

    const resultado=document.querySelector('.resultados');

    let alumnos=JSON.parse(localStorage.getItem('alumnos')) || [];

    mostrarHTML();


    formulario.addEventListener('submit', validarFormulario);
    resultado.addEventListener('click', eliminarAlumno);
    resultado.addEventListener('click', editarNota);


    function validarFormulario(e){
        e.preventDefault();
        if(nombreInput.value==='' || apellidoInput.value==='' || emailInput.value==='' || asignaturaInput.value==='' || notaInput.value===''){
            alert('Todos los campos son obligatorios');
            return;
        }

        const nuevoAlumno={
            id: Date.now(),
            nombre: nombreInput.value,
            apellidos: apellidoInput.value,
            correo: emailInput.value,
            asignatura: asignaturaInput.value,
            nota: notaInput.value
        }

        alumnos=[...alumnos,nuevoAlumno];

        mostrarHTML();

        formulario.reset();
    }

    function mostrarHTML(){
        resultado.innerHTML='';

        const titulo=document.createElement('H4')
        titulo.textContent='Alumnos registrados';
        resultado.appendChild(titulo);

        if(alumnos.length===0){
            resultado.innerHTML='<p>No hay alumnos</p>';
            return;
        }

        alumnos.forEach(alumno => {
            const {nombre, apellidos, correo, asignatura, nota}=alumno;

            const alumnoHTML=document.createElement('div');
            alumnoHTML.innerHTML=`
            <div class="alumno">
                <p>Nombre: ${nombre}</p>
                <p>Apellidos: ${apellidos}</p>
                <p>Correo: ${correo}</p>
                <p>Asignatura: ${asignatura}</p>
                <p>Nota: ${nota}</p>
                <hr></hr>

                <button class="botons eliminar" data-id="${alumno.id}">Eliminar</button>
                <button class="botons editar" data-id="${alumno.id}">Editar nota</button>

            `;

            resultado.appendChild(alumnoHTML);

            JSON.stringify(localStorage.setItem('alumnos', JSON.stringify(alumnos)));
        });

    }

    function eliminarAlumno(e){
        if(e.target.classList.contains('eliminar')){
            const alumnoId=e.target.getAttribute('data-id');

            alumnos=alumnos.filter(alumno=>alumno.id!==parseInt(alumnoId));

            JSON.stringify(localStorage.setItem('alumnos', JSON.stringify(alumnos)));

            mostrarHTML();
        }
    }

    function editarNota(e){
        if(e.target.classList.contains('editar')){
            const alumnoId=e.target.getAttribute('data-id');
            const alumnoSeleccionado=alumnos.find(alumno=>alumno.id===parseInt(alumnoId));
            
            const nuevaNota=prompt('Ingresa la nueva nota', alumnoSeleccionado.nota);

            if(!nuevaNota){
                return;
            }

            alumnoSeleccionado.nota=parseInt(nuevaNota);

            mostrarHTML();
        }
    }

    // function modificarNota(alumno){
    //     const {nota}=alumno;
    //     const nuevaNota=prompt('Ingresa la nueva nota', nota);

    //     if(!nuevaNota){
    //         return;
    //     }

    //     alumnos=alumnos.map(alumno=>alumno.id===parseInt(alumno.id) ? {...alumno, nota: nuevaNota} : alumno);
    //     mostrarHTML();
    // }


});