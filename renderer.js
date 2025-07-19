let notes = JSON.parse(localStorage.getItem("notes")) || {};
let currentNote = null;

function generateId() {
  return Math.random().toString(36).substring(2, 8);
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderTasks() {
  const container = document.getElementById("tasks");
  container.innerHTML = "";
  if (!currentNote || !notes[currentNote]) return;

  notes[currentNote].forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task ${task.status}`;
    div.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleStatus(${index})">🔁</button>
        <button onclick="removeTask(${index})">❌</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById("currentNoteId").innerText = "📘 ID Notesiku: " + currentNote;
  renderNoteSwitcher();
}

function addTask() {
  const input = document.getElementById("newTask");
  if (!input.value || !currentNote) return;
  notes[currentNote].push({ text: input.value, status: "in-progress" });
  input.value = "";
  saveNotes();
  renderTasks();
}

function removeTask(index) {
  notes[currentNote].splice(index, 1);
  saveNotes();
  renderTasks();
}

function toggleStatus(index) {
  const task = notes[currentNote][index];
  task.status = task.status === "in-progress" ? "done" : "in-progress";
  saveNotes();
  renderTasks();
}

function createNote() {
  const id = generateId();
  notes[id] = [];
  currentNote = id;
  saveNotes();
  renderTasks();
}

function joinNote() {
  const id = document.getElementById("joinId").value.trim();
  if (!id) return;
  if (!notes[id]) notes[id] = [];
  currentNote = id;
  saveNotes();
  renderTasks();
}

function switchNote(id) {
  currentNote = id;
  renderTasks();
}

function renderNoteSwitcher() {
  const list = document.getElementById("notesList");
  list.innerHTML = "<strong>Twoje notesiki:</strong> ";
  Object.keys(notes).forEach(id => {
    const span = document.createElement("span");
    span.className = "note-switcher" + (id === currentNote ? " active" : "");
    span.innerText = id;
    span.onclick = () => switchNote(id);
    list.appendChild(span);
  });
}

renderTasks();
