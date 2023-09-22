"use strict";

const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>

  <div class="main ${text ? "" : "hidden"}"> </div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
  `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textAreaBtn = note.querySelector("textarea");

  textAreaBtn.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener("click", function () {
    note.remove();

    updateLS();
  });
  editBtn.addEventListener("click", function () {
    main.classList.toggle("hidden");
    textAreaBtn.classList.toggle("hidden");
  });

  textAreaBtn.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.append(note);
}

addBtn.addEventListener("click", () => addNewNote());
