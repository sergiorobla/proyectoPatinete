document.addEventListener("DOMContentLoaded", function () {
  //! Seleccionamos los elementos del DOM
  const buttonEliminar = document.querySelector(".button-85"); //! Botón para eliminar
  const listaParticipantes = document.querySelector(".participantes"); //! Lista de participantes
  const listaEliminados = document.querySelector(".eliminados"); //! Lista de participantes eliminados

  //! Definimos la clase Participante
  class Participante {
    constructor(nombre, participacion) {
      this.nombre = nombre; //! Nombre del participante
      this.participacion = participacion; //! Estado de participación (activo o eliminado)
    }
  }

  //! Definimos la clase Sorteo
  class Sorteo {
    constructor(participantes) {
      this.participantes = participantes; //! Lista de participantes
      this.eliminados = []; //! Lista de participantes eliminados
    }

    //! Método para ejecutar el sorteo
    ejecutarSorteo() {
      this.actualizarParticipantesDOM(); //! Actualizar la lista de participantes en el DOM

      //! Filtrar participantes activos
      const participantesActivos = this.participantes.filter(
        (participante) => participante.participacion
      );

      //! Si no hay participantes activos, salir del método
      if (participantesActivos.length === 0) {
        console.log("No hay participantes activos para el sorteo.");
        return;
      }

      //! Seleccionar un ganador al azar
      const indiceGanador = Math.floor(
        Math.random() * participantesActivos.length
      );
      const ganador = participantesActivos[indiceGanador];

      //! Marcar al ganador como eliminado
      ganador.participacion = false;
      this.eliminados.push(ganador); //! Agregar al ganador a la lista de eliminados

      this.actualizarDOM(); //! Actualizar el DOM con los cambios

      //! Si queda un participante activo, mostrar alerta con el nombre del ganador
      if (
        this.participantes.filter((participante) => participante.participacion)
          .length === 1
      ) {
        const ultimoParticipante = this.participantes.find(
          (participante) => participante.participacion
        );
        Swal.fire({
          icon: "success",
          title: `¡Enhorabuena ${ultimoParticipante.nombre}, <br /> has Ganado! <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div> <div class="confeti"></div>`,
          allowOutsideClick: false,
          customClass: {
            title: "mi-clase-titulo",
          },
          confirmButtonText:
            "<a href='./index.html' style='color: white; text-decoration: none; padding: 20px;'>OK</a>",
        });
        buttonEliminar.disabled = true; //! Deshabilitar el botón de eliminar
      }
    }

    //! Método para actualizar la lista de participantes en el DOM
    actualizarParticipantesDOM() {
      listaParticipantes.innerHTML = "<h2>Participantes</h2>";
      this.participantes.forEach((participante) => {
        if (participante.participacion) {
          const elemento = document.createElement("div");
          elemento.textContent = participante.nombre;
          listaParticipantes.appendChild(elemento);
        }
      });
    }

    //! Método para actualizar la lista de participantes eliminados en el DOM
    actualizarEliminadosDOM() {
      listaEliminados.innerHTML = "<h2>Eliminados</h2>";
      this.eliminados.forEach((eliminado) => {
        const elemento = document.createElement("div");
        elemento.textContent = eliminado.nombre;
        listaEliminados.appendChild(elemento);
      });
    }

    //! Método para actualizar el DOM llamando a los métodos de actualización de participantes y eliminados
    actualizarDOM() {
      this.actualizarParticipantesDOM();
      this.actualizarEliminadosDOM();
    }
  }

  //! Crear una lista de objetos Participante
  const nombresParticipantes = [
    new Participante("Shere", true),
    new Participante("Sergi", true),
    new Participante("Alex", true),
    new Participante("Sara", true),
    new Participante("Moha", true),
    new Participante("Adri", true),
    new Participante("David", true),
    new Participante("Albert", true),
    new Participante("Thirza", true),
    new Participante("Sergio", true),
    new Participante("Aitor", true),
    new Participante("Eric", true),
  ];

  //! Crear una instancia de la clase Sorteo
  const sorteo = new Sorteo(nombresParticipantes);

  //! Agregar un event listener al botón para ejecutar el sorteo
  buttonEliminar.addEventListener("click", function () {
    sorteo.ejecutarSorteo();
  });

  //! Actualizar el DOM inicialmente
  sorteo.actualizarDOM();

  //! Si queda un participante activo, deshabilitar el botón de eliminar
  if (
    sorteo.participantes.filter((participante) => participante.participacion)
      .length === 1
  ) {
    buttonEliminar.disabled = true;
  }
});
