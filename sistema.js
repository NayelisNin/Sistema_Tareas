let tareas = [
  {
    id: 1,
    fecha: "2025-06-22",
    materia: "UX Design",
    prioridad: "High",
    titulo: "User Flow",
    descripcion: "Diseñar el flujo de usuarios del dashboard"
  },
  {
    id: 2,
    fecha: "2025-06-23",
    materia: "Development",
    prioridad: "Medium",
    titulo: "Website Design",
    descripcion: "Crear el diseño general del sitio web"
  }
];

function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

const form = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tarea = {
    id: taskIdInput.value || Date.now(),
    fecha: document.getElementById("fecha").value,
    materia: document.getElementById("materia").value,
    prioridad: document.getElementById("prioridad").value,
    titulo: document.getElementById("titulo").value,
    descripcion: document.getElementById("descripcion").value
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

const contenedor = document.getElementById("tasksContainer");

function mostrarTareas() {
  contenedor.innerHTML = "";
  tareas.forEach(tarea => {
    const card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
      ...
    `;

    contenedor.appendChild(card);
  });


  tareas.forEach(tarea => {
    const card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
  <div class="task-header">
    <span class="badge ${tarea.prioridad.toLowerCase()}">
      ${tarea.prioridad}
    </span>
  </div>

  <div class="task-meta">
    <span class="meta-item">${tarea.fecha}</span>
    <span class="meta-item">${tarea.materia}</span>
  </div>

  <h3>${tarea.titulo}</h3>

  <p class="task-desc" id="desc-${tarea.id}">
    ${tarea.descripcion}
  </p>

  <button class="ver-mas" onclick="toggleDescripcion(${tarea.id})">
    Ver más
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

mostrarTareas();

function editarTarea(id) {
  const tarea = tareas.find(t => t.id === id);

  document.getElementById("fecha").value = tarea.fecha;
  document.getElementById("materia").value = tarea.materia;
  document.getElementById("prioridad").value = tarea.prioridad;
  document.getElementById("titulo").value = tarea.titulo;
  document.getElementById("descripcion").value = tarea.descripcion;

  document.getElementById("taskId").value = tarea.id;
}

function eliminarTarea(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");

  if (confirmar) {
    tareas = tareas.filter(t => t.id !== id);
    guardarEnLocalStorage();
    mostrarTareas();
  }
}
