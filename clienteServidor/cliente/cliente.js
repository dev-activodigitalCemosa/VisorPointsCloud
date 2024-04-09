
const modelosDisponibles = [];

async function cargarDatos() {
    try {
      const response = await fetch('http://localhost:4321/datos');
      const data = await response.json();
      //listaDatos.innerHTML = ''; 
      data.forEach(dato => {
        modelosDisponibles.push({nombre: dato.nombre})
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

// Función para cargar los modelos en el selector
async function cargarModelos() {
    await cargarDatos();
    const selectModelo = document.getElementById('selectModelo');
    modelosDisponibles.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo.id;
        option.textContent = modelo.nombre;
        selectModelo.appendChild(option);
    });
}

// Evento click del botón
document.getElementById('btnCargarModelo').addEventListener('click', () => {
    const selectModelo = document.getElementById('selectModelo');
    const modeloSeleccionado = selectModelo.value;
    if (modeloSeleccionado) {
        alert(`Cargar modelo ${modeloSeleccionado}`);
      
    } else {
        alert('Por favor selecciona un modelo');
    }
});

// Cargar modelos al cargar la página
window.addEventListener('load', cargarModelos);
