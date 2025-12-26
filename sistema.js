let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const form = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");
const contenedor = document.getElementById("tasksContainer");
const filtroPrioridad = document.getElementById("filterPrioridad");
const ordenFecha = document.getElementById("orderFecha");
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const fechaInput = document.getElementById("fecha");
const materiaInput = document.getElementById("materia");
const prioridadInput = document.getElementById("prioridad");

const prioridadTexto = {
  High: "Alta",
  Medium: "Media",
  Low: "Baja"
};


function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

form.addEventListener("submit", e => {
  e.preventDefault();
  

const id = Number(taskIdInput.value);
  const tarea = {
    id: id ? id : Date.now(),
    fecha: fecha.value,
    materia: materia.value,
    prioridad: prioridad.value,
    titulo: titulo.value,
    descripcion: descripcion.value
  };

   if (id) {
    tareas = tareas.map(t => t.id == id ? tarea : t);
  } else {
    tareas.push(tarea);
  }

  guardarEnLocalStorage();
  form.reset();
  taskIdInput.value = "";
  mostrarTareas();
});

filtroPrioridad.addEventListener("change", mostrarTareas);
ordenFecha.addEventListener("change", mostrarTareas);

function mostrarTareas() {
  contenedor.innerHTML = "";

  let lista = tareas.slice();

  if (filtroPrioridad.value !== "") {
    lista = lista.filter(t => t.prioridad === filtroPrioridad.value);
  }

  lista.sort(function (a, b) {
    if (ordenFecha.value === "asc") {
      return new Date(a.fecha) - new Date(b.fecha);
    } else {
      return new Date(b.fecha) - new Date(a.fecha);
    }
  });

  for (let i = 0; i < lista.length; i++) {
    const tarea = lista[i];

    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
<span class="badge ${tarea.prioridad.toLowerCase()}">
  ${prioridadTexto[tarea.prioridad]}
</span>

      <div class="task-meta">
        <span class="meta-item">${tarea.fecha}</span>
        <span class="meta-item">${tarea.materia}</span>
      </div>

      <h3>${tarea.titulo}</h3>

      <p class="task-desc collapsed" id="desc-${tarea.id}">
        ${tarea.descripcion}
      </p>

      <button class="ver-mas" onclick="toggleDescripcion(${tarea.id})">
        Ver menos
      </button>

      <div class="task-footer">
        <div class="actions">
          <button onclick="editarTarea(${tarea.id})">✏️</button>
          <button onclick="eliminarTarea(${tarea.id})">🗑️</button>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  };
}

function toggleDescripcion(id) {
  const desc = document.getElementById("desc-" + id);
  const btn = desc.nextElementSibling;

  if (desc.classList.contains("collapsed")) {
    desc.classList.remove("collapsed");
    btn.textContent = "Ver menos";
  } else {
    desc.classList.add("collapsed");
    btn.textContent = "Ver más";
  }
}


function editarTarea(id) {
  const tarea = tareas.find(t => t.id == id);
  if (!tarea) return;

  fechaInput.value = tarea.fecha;
  materiaInput.value = tarea.materia;
  prioridadInput.value = tarea.prioridad;
  tituloInput.value = tarea.titulo;
  descripcionInput.value = tarea.descripcion;
  taskIdInput.value = tarea.id;
}


function eliminarTarea(id) {
  if (confirm("¿Eliminar esta tarea?")) {
    tareas = tareas.filter(t => t.id !== id);
    guardarEnLocalStorage();
    mostrarTareas();
  }
}

mostrarTareas();