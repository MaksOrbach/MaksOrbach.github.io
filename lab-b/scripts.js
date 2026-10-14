class Todo
{
  constructor()
  {
    this.list = document.getElementById("tasks-list");
    this.tasks = this.load();
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

  draw()
  {
    this.list.innerHTML = "";

    for (const [index, task] of this.tasks.entries())
    {
      const li = document.createElement("li");
      li.className = "task";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.text;

      const date = document.createElement("span");
      date.className = "task-date";
      date.textContent = task.date.replace("T", " ");

      const del = document.createElement("button");
      del.className = "delete";
      del.title = "Delete";
      del.textContent = "X";
      del.addEventListener("click", () => this.remove(index));

      li.append(checkbox, text, date, del);
      this.list.appendChild(li);
    }
  }

  add(text, date)
  {
    text = text.trim();

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

    this.tasks.push({ text: text, date: date });
    this.save();
    this.draw();
    return true;
  }

  remove(index)
  {
    this.tasks.splice(index, 1);
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
