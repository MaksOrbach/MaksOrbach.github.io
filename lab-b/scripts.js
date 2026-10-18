class Todo
{
  constructor()
  {
    this.list = document.getElementById("tasks-list");
    this.tasks = this.load();
    this.term = "";
    this.editing = null;
  }

  load()
  {
    const saved = localStorage.getItem("tasks");
    if (saved === null)
    {
      return [];
    }
    return JSON.parse(saved);
  }

  save()
  {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  get filteredTasks()
  {
    if (this.term.length < 2)
    {
      return this.tasks;
    }
    const term = this.term.toLowerCase();
    return this.tasks.filter(task => task.text.toLowerCase().includes(term));
  }

  highlight(span, text)
  {
    const term = this.term.toLowerCase();

    if (term.length < 2)
    {
      span.textContent = text;
      return;
    }

    const lower = text.toLowerCase();
    let pos = 0;
    let found = lower.indexOf(term);

    while (found !== -1)
    {
      span.append(text.slice(pos, found));

      const mark = document.createElement("mark");
      mark.textContent = text.slice(found, found + term.length);
      span.append(mark);

      pos = found + term.length;
      found = lower.indexOf(term, pos);
    }

    span.append(text.slice(pos));
  }

  draw()
  {
    this.list.innerHTML = "";

    for (const task of this.filteredTasks)
    {
      const index = this.tasks.indexOf(task);

      const li = document.createElement("li");
      li.className = "task";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const del = document.createElement("button");
      del.className = "delete";
      del.title = "Delete";
      del.textContent = "X";
      del.addEventListener("click", () => this.remove(index));

      if (index === this.editing)
      {
        li.classList.add("editing");

        const editText = document.createElement("input");
        editText.type = "text";
        editText.className = "edit-text";
        editText.value = task.text;
        editText.addEventListener("keydown", event => {
          if (event.key === "Enter")
          {
            this.saveEdit();
          }
        });

        const editDate = document.createElement("input");
        editDate.type = "datetime-local";
        editDate.value = task.date;

        this.editText = editText;
        this.editDate = editDate;

        li.append(checkbox, editText, editDate, del);
      }
      else
      {
        const text = document.createElement("span");
        text.className = "task-text";
        this.highlight(text, task.text);

        const date = document.createElement("span");
        date.className = "task-date";
        date.textContent = task.date.replace("T", " ");

        const startEdit = event => {
          event.stopPropagation();
          this.startEdit(index);
        };
        text.addEventListener("click", startEdit);
        date.addEventListener("click", startEdit);

        li.append(checkbox, text, date, del);
      }

      this.list.appendChild(li);
    }
  }

  validate(text, date)
  {
    if (text.length < 3 || text.length > 255)
    {
      alert("Task must have 3-255 characters.");
      return false;
    }

    if (date !== "" && new Date(date) <= new Date())
    {
      alert("Date must be empty or in the future.");
      return false;
    }

    return true;
  }

  add(text, date)
  {
    text = text.trim();

    if (!this.validate(text, date))
    {
      return false;
    }

    this.tasks.push({ text: text, date: date });
    this.save();
    this.draw();
    return true;
  }

  remove(index)
  {
    this.editing = null;
    this.tasks.splice(index, 1);
    this.save();
    this.draw();
  }

  startEdit(index)
  {
    this.editing = index;
    this.draw();
    this.editText.focus();
  }

  saveEdit()
  {
    const text = this.editText.value.trim();
    const date = this.editDate.value;

    if (!this.validate(text, date))
    {
      return;
    }

    this.tasks[this.editing] = { text: text, date: date };
    this.editing = null;
    this.save();
    this.draw();
  }
}

document.todo = new Todo();
document.todo.draw();

const form = document.getElementById("add-form");
const newText = document.getElementById("new-text");
const newDate = document.getElementById("new-date");

form.addEventListener("submit", event => {
  event.preventDefault();

  if (document.todo.add(newText.value, newDate.value))
  {
    newText.value = "";
    newDate.value = "";
  }
});

const search = document.getElementById("search");

search.addEventListener("input", () => {
  document.todo.term = search.value.trim();
  document.todo.draw();
});

document.addEventListener("click", event => {
  if (document.todo.editing !== null && !event.target.closest(".editing"))
  {
    document.todo.saveEdit();
  }
});
