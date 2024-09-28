document.getElementById('materiaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const alumnos = document.getElementById('alumnos').value;

   r
    await fetch('/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, alumnos }),
    });

   
    document.getElementById('materiaForm').reset();
    obtenerMaterias();
});


async function obtenerMaterias() {
    const response = await fetch('/materias');
    const materias = await response.json();
    
    const materiasList = document.getElementById('materiasList');
    materiasList.innerHTML = '';
    materias.forEach(m => {
        materiasList.innerHTML += `
            <div>
                <p>${m.nombre} - ${m.alumnos} alumnos</p>
                <button onclick="obtenerMateria(${m.id})">Ver</button>
                <button onclick="eliminarMateria(${m.id})">Eliminar</button>
            </div>`;
    });
}


async function obtenerMateria(id) {
    const response = await fetch(`/materias/${id}`);
    const materia = await response.json();
    alert(`Materia: ${materia.nombre}\nAlumnos: ${materia.alumnos}`);
}


async function eliminarMateria(id) {
    await fetch(`/materias/${id}`, {
        method: 'DELETE',
    });
    obtenerMaterias(); 
}


document.getElementById('eliminarTodas').addEventListener('click', async () => {
    await fetch('/materias', {
        method: 'DELETE',
    });
    obtenerMaterias(); 
});


obtenerMaterias();
