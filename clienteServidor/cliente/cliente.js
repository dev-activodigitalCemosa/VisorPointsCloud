
const modelosDisponibles = [];
let ruta ='';

async function cargarNubesPuntos() {
    try {
      const response = await fetch('http://localhost:4321/nube-puntos');
      const data = await response.json();
      //listaDatos.innerHTML = ''; 
      data.forEach(dato => {
        modelosDisponibles.push({nombre: dato.nombre})
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  async function cargarDatosUsuario(usuarioId) {
    try {
      const response = await fetch(`http://localhost:4321/usuario/${usuarioId}`);
      const data = await response.json();
      console.log(data);
      document.getElementById('nombreCliente').textContent = data[0].nombre+' '+data[0].apellidos;
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }

async function ObtenerRuta(nombreNP) {
    try {
      console.log(nombreNP);
      const response = await fetch(`http://localhost:4321/ruta/${nombreNP}`);
      const data = await response.json();
      console.log(data);
      ruta= data[0].ruta;
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }

async function cargarInformacion() {
    await cargarNubesPuntos();
    const selectModelo = document.getElementById('selectModelo');
    modelosDisponibles.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo.id;
        option.textContent = modelo.nombre;
        selectModelo.appendChild(option);
    });
    await cargarDatosUsuario('4');
}

// Evento click del botón
document.getElementById('btnCargarModelo').addEventListener('click', async () => {
    const selectModelo = document.getElementById('selectModelo');
    var modeloSeleccionado = selectModelo[selectModelo.selectedIndex].innerHTML;
    if (modeloSeleccionado) {
      await ObtenerRuta(modeloSeleccionado)
      window.location.href = 'Nubes/'+ruta;
      
    } else {
        alert('Por favor selecciona un modelo');
    }
});

// Cargar modelos al cargar la página
window.addEventListener('load', cargarInformacion);
