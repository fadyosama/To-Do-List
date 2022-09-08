let text_addTask=document.querySelector(".text");
let addTask_button=document.querySelector(".addTask")
let taskArea = document.querySelector(".tasks")
let deleteButton=document.querySelector(".deleteButton")
let clear_all=document.querySelector(".clear_all")

//Enter
text_addTask.onclick=function(){
    document.onkeypress=function(e){
        if(e.keyCode === 13){
            create_task(text_addTask.value,"newTask_parent")
            save()
        }
    }
}

//addTask_button
addTask_button.onclick=function(){
    create_task(text_addTask.value,"newTask_parent")
    save()
}

// function to add element in broweser
function create_task(content,class_name){
    let newTask_parent = document.createElement("div");
    newTask_parent.className=class_name

    let newTask = document.createElement("div")
    newTask.className="new_task"
    newTask_content=document.createTextNode(content)
    newTask.appendChild(newTask_content)

    let editButton = document.createElement("div")
    editButton.className = "edit_button"
    let editButton_content=document.createTextNode("Edit")
    editButton.appendChild(editButton_content)

    let deleteButton = document.createElement("div")
    deleteButton.className="deleteButton"
    let deleteButton_content=document.createTextNode("Delete")
    deleteButton.appendChild(deleteButton_content)
    
    newTask_parent.appendChild(newTask)
    newTask_parent.appendChild(editButton)
    newTask_parent.appendChild(deleteButton)

    taskArea.appendChild(newTask_parent)
    text_addTask.value=""
}

//Delete
document.addEventListener("click",function(e){
    if(e.target.className === "deleteButton"){
        e.target.parentElement.remove()
        save()
}})
//Clear All
clear_all.onclick=function(e){
    window.localStorage.removeItem("task")
    window.location.reload()
}
//Save
var obj={};

function save(){
    obj={}
    let tasks=document.querySelectorAll(".tasks .newTask_parent .new_task");
    console.log(tasks)
    tasks.forEach(function(e){
        obj[e.textContent]=e.parentElement.className;
    })
    console.log(obj)
    window.localStorage.setItem("task",JSON.stringify(obj))

    let newobj=window.localStorage.getItem("task")
    // console.log(JSON.parse(newobj))
}

//write from localStorage data
for(key in JSON.parse(window.localStorage.getItem("task"))){
    // console.log(key)
    // console.log(JSON.parse(window.localStorage.getItem("task"))[key])
    obj[key]=JSON.parse(window.localStorage.getItem("task"))[key];
    create_task(key,JSON.parse(window.localStorage.getItem("task"))[key])
    
}
document.onclick=function(e){
        //edit
    if(e.target.className ==="edit_button"){

        let edit_task = document.createElement("input")
        edit_task.className="edit_task"

        let curent_task = e.target.previousElementSibling
        let previous_content_task = curent_task.textContent
        curent_task.textContent=""
        edit_task.value=previous_content_task
        
        curent_task.appendChild(edit_task)
        edit_task.focus()
        
        document.onkeypress=function(e){
            if(e.keyCode===13){
                curent_task.textContent=edit_task.value
                edit_task.remove()
                save()
            }
        }
        edit_task.onblur=function(){
            curent_task.textContent=previous_content_task
            edit_task.remove()
            save()
        }
    }
}

//activation

document.addEventListener("click",function(e){
    if(e.target.className === "new_task" ){
        e.target.parentElement.classList.toggle("active")
        save()
    }
    
})


// var mousePosition;
// var offset=[0,0]
// var div;
// var isDown = false;

// div=document.createElement("div");
// div.style.position="absolute";
// div.style.left="0px";
// div.style.top="0px";
// div.style.width="480px";
// div.style.height="31px";
// div.style.background="#ff9800"
// div.style.color="blue"

// document.body.appendChild(div)

// div.addEventListener("mousedown",function(e){
//     isDown=true;
//     offset=[
//         div.offsetLeft - e.clientX,
//         div.offsetTop - e.clientY
//     ];
//     // console.log(`BEFORE div.offsetLeft ${div.offsetLeft}`)
//     // console.log(`BEFORE div.offsetTop ${div.offsetTop}`)
//     // console.log(`BEFORE e.clientX ${e.clientX}`)
//     // console.log(`BEFORE e.clientY ${e.clientY}`)
// },true)

// document.addEventListener("mouseup",function(e){
//     isDown=false;
//     // console.log(`AFTER  div.offsetLeft ${div.offsetLeft}`)
//     // console.log(`AFTER  div.offsetTop ${div.offsetTop}`)
//     // console.log(`AFTER  e.clientX ${e.clientX}`)
//     // console.log(`AFTER  e.clientY ${e.clientY}`)
// },true)

// document.addEventListener("mousemove",function(event){
//     event.preventDefault();
//     // console.log(`${event.clientX} , ${event.clientY}`)
//     if(isDown){
//         mousePosition = {
//             x : event.clientX,
//             y : event.clientY
//         };
    
//     div.style.left = (mousePosition.x + offset[0])+'px'
//     div.style.top = (mousePosition.y + offset[1])+'px'
//     replace()
//     }
// },true);

// let task=document.querySelectorAll(".newTask_parent")
// task.forEach(function(e){
//     console.log(`${e.offsetLeft + taskArea.offsetLeft}  ,  ${e.offsetTop + taskArea.offsetTop}`)

//     e.addEventListener("mousedown",function(e){
//         isDown=true;
//         offset=[
//             e.offsetLeft - e.clientX,
//             e.offsetTop - e.clientY
//         ];
//         console.log(e)
//     },true)
//     document.addEventListener("mouseup",function(e){
//         isDown=false;
//     },true)
    
//     document.addEventListener("mousemove",function(event){
//         event.preventDefault();
//         // console.log(`${event.clientX} , ${event.clientY}`)
//         if(isDown){
//             mousePosition = {
//                 x : event.clientX,
//                 y : event.clientY
//             };
        
//         e.style.left = (mousePosition.x + offset[0])+'px'
//         e.style.top = (mousePosition.y + offset[1])+'px'
//         replace()
//         }
//     },true);
// })

// function replace(){
//     task.forEach(function(e){
//         if(div.offsetTop === (e.offsetTop + taskArea.offsetTop) || div.offsetTop === (e.offsetTop + taskArea.offsetTop +5) || div.offsetTop === (e.offsetTop + taskArea.offsetTop -5)){
//             console.log(`block above ${e.textContent}`)
//             // console.log(obj)
//         }
        
// })
// }

