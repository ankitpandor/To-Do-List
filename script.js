document.addEventListener("DOMContentLoaded", function() {
    let tasks = [];

    const todoForm = document.getElementById("todoForm");
    const taskList = document.getElementById("taskList");

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskInput = document.getElementById("task");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {

            tasks.push({ text: taskText, completed: false });

            updateTaskList();

            taskInput.value = "";
        }
    });

    function updateTaskList() {
  
        taskList.innerHTML = "";

        tasks.forEach(function(task, index) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
                <label for="task${index}" class="${task.completed ? 'completed' : ''}">${task.text}</label>
                <button data-index="${index}">Remove</button>
            `;

            listItem.querySelector(`#task${index}`).addEventListener("change", function() {

                tasks[index].completed = !tasks[index].completed;
                updateTaskList();
            });

            listItem.querySelector("button").addEventListener("click", function() {
                tasks.splice(index, 1);
                updateTaskList();
            });

            taskList.appendChild(listItem);
        });
        console.log(JSON.stringify(tasks));
    }

    updateTaskList();
});