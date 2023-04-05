let tasks = [];
const taskscounter = document.getElementById('tasks-counter');
const addTaskInput = document.getElementById('add');
const taskList = document.getElementById('list');
const heading = document.querySelector('.headingInDisplay');
function fillHeadingInDisplay() {
    if (taskscounter.innerText == 0) {
        heading.innerText = "Your Task display here . .  .";
        heading.classList.add('headingInDisplay');
        return;
    }
}
function fetchTodos()
{
    
}
function showNotification(msg) {
    alert(msg);
}
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.Done ? 'checked' : ''}  class="custom-checkbox" />
    <label for="${task.id}"> ${task.text}</label>
      <img src="delete icon.png" class="delete" data-id="${task.id}" />`
    const hr = document.createElement('hr');
    hr.style.marginTop = "-2px";
    hr.style.marginBottom = "2px";
    taskList.append(hr);
    taskList.append(li);
}
function deleteTask(taskid) {
    const newTasks = tasks.filter((task) => { return task.id != taskid })
    showNotification('Task Deleted successfully');
    tasks=newTasks;
    taskscounter.innerHTML--;
    renderList();
    fillHeadingInDisplay();
}
function markTaskAsComplete(taskid) {

}
function renderList() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    fillHeadingInDisplay();
}
function toggleTask(taskid) {
    const task = tasks.filter((tasks) => {
        return tasks.id == taskid;
    });
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.Done = !currentTask.Done;
        renderList();
        showNotification('Task toggle successfully');
        return;
    }
}
function addTask(task) {
    if (task) {
        taskscounter.innerHTML++;
        let taskobj;
        taskobj = { text: task, id: Date.now(), Done: false }
        tasks.push(taskobj);
        showNotification("Task added succesfully!");
        addTaskInput.value = "";
        renderList();
        return;
    }
    showNotification("Task can not be empty");
    return;
}
function handleInputkeypress(event)
{
        if (event.key == "Enter") {
            addTask(addTaskInput.value);
        }
}
function handleClickListener(e) {
    const target = e.target;
    console.log(target);
    if (target.className == 'delete') {
        const taskID = target.dataset.id;
        console.log(taskID);
        deleteTask(taskID);
        return;
    }
    else if (target.className == 'custom-checkbox') {
        const taskID = target.id;
        toggleTask(taskID);
        return;
    }
}
function intializeApp()
{
 fetchTodos();
 fillHeadingInDisplay();
 document.addEventListener('click', handleClickListener);
 document.addEventListener('keyup',handleInputkeypress);
}
intializeApp();
