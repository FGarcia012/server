document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addTaskButton = document.getElementById("addTaskButton");
 
    addTaskButton.addEventListener("click", async () => {
      const taskValue = taskInput.value.trim() ?? "";
      if (taskValue) {
        try{
            await addTask(taskValue);
            taskInput.value = "";
        } catch (error){
            console.log(`Error al ingresar la tarea ${error}`);
        }
      }
    });
 
    taskList.addEventListener("click", (event) => {
      const { target } = event;
 
      if (target.classList.contains("complete-btn")) {
        toggleCompleteTask(target.closest("li"), target);
      }
 
      if(target.classList.contains("delete-btn")){
          deleteTask(target.closest("li"));
      }
    });
 
    const addTask = async (task) => {
      try{
        const result = await simulateServerRequest(task);
        const listItem = document.createElement("li");
        listItem.innerHTML=`
            <span>${task}</span>
            <button class="complete-btn">Completar</button>
            <button class="delete-btn">Eliminar</button>
        `;
        taskList.appendChild(listItem);
        console.log(result);
      }catch(error){
        throw new Error(error);
      }
    };
 
    const simulateServerRequest = (task) => {
        return new Promise((resolve, reject) =>{
            setTimeout(() =>{
                const isSuccess = Math.random() > 0.2;
                if(isSuccess){
                    resolve(`Tarea ${task} agregada con éxito`)
                }else{
                    reject("Error al agregar al servidor")
                }
            },1000)
        })
    }
 
    const toggleCompleteTask = (listItem, completeButton) => {
      listItem.classList.toggle("completed");
      const deleteButton = listItem.querySelector(".delete-btn");
 
      listItem.classList.contains("completed")
        ? ((completeButton.disabled = true),
          (completeButton.style.display = "none"))
        : ((completeButton.disabled = false),
          (completeButton.style.display = "inline-block"));
 
      deleteButton.style.display = "inline-block";
    };
 
    const deleteTask = (listItem) =>{
      listItem.remove();
    };
  });