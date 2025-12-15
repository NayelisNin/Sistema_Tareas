let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const form = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");
const contenedor = document.getElementById("tasksContainer");
const filtroPrioridad = document.getElementById("filterPrioridad");
const ordenFecha = document.getElementById("orderFecha");

function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const tarea = {
    id: taskIdInput.value || Date.now(),
    fecha: fecha.value,
    materia: materia.value,
    prioridad: prioridad.value,
    titulo: titulo.value,
    descripcion: descripcion.value
  };

  if (taskIdInput.value === "") {
    tareas.push(tarea);
  } else {
    const index = tareas.findIndex(t => t.id == tarea.id);
    tareas[index] = tarea;
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

  let lista = [...tareas];

  if (filtroPrioridad.value) {
    lista = lista.filter(t => t.prioridad === filtroPrioridad.value);
  }

  lista.sort((a, b) =>
    ordenFecha.value === "asc"
      ? new Date(a.fecha) - new Date(b.fecha)
      : new Date(b.fecha) - new Date(a.fecha)
  );

  lista.forEach(tarea => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <span class="badge ${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>

      <div class="task-meta">
        <span class="meta-item">${tarea.fecha}</span>
        <span class="meta-item">${tarea.materia}</span>
      </div>

      <h3>${tarea.titulo}</h3>

      <p class="task-desc" id="desc-${tarea.id}">
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
  });
}

function toggleDescripcion(id) {
  const desc = document.getElementById(`desc-${id}`);
  const btn = desc.nextElementSibling;

  desc.classList.toggle("collapsed");

  btn.textContent = desc.classList.contains("collapsed")
    ? "Ver más"
    : "Ver menos";
}

function editarTarea(id) {
  const tarea = tareas.find(t => t.id === id);

  fecha.value = tarea.fecha;
  materia.value = tarea.materia;
  prioridad.value = tarea.prioridad;
  titulo.value = tarea.titulo;
  descripcion.value = tarea.descripcion;
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
