let text_addTask=document.querySelector(".text");
let addTask_button=document.querySelector(".addTask")
let taskArea = document.querySelector(".tasks")
let deleteButton=document.querySelector(".deleteButton")
let clear_all=document.querySelector(".clear_all")

// ------------------------------------------------------------------------------
//write from localStorage data
var obj={};

skills_object=JSON.parse(window.localStorage.getItem("task"))
console.log(skills_object)

for(key in skills_object){
    // console.log(key)
    // console.log(skills_object[key])
    let list_skills=[skills_object[key][0],skills_object[key][1]]
    obj[key]=list_skills;
    create_task(list_skills[0],list_skills[1],key) 
}
try{
    nums_skills=(Object.keys(skills_object)).length
}
catch{
    nums_skills=0
}
// ------------------------------------------------------------------------------
window.onload =function(){
    text_addTask.focus()
    document.onkeypress=function(e){
        if(e.keyCode === 13){
            create_task(text_addTask.value,"newTask_parent",++nums_skills)
            save()
        }
    }
  }
//Enter
text_addTask.onclick=function(){
    document.onkeypress=function(e){
        if(e.keyCode === 13){
            create_task(text_addTask.value,"newTask_parent",++nums_skills)
            save()
        }
    }
}

//addTask_button
addTask_button.onclick=function(){
    create_task(text_addTask.value,"newTask_parent",++nums_skills)
    save()
}

// function to add element in broweser
function create_task(content,class_name,nums_skills){
    let newTask_parent = document.createElement("div");
    newTask_parent.className=class_name

    let newTask = document.createElement("div")
    newTask.className="new_task"
    newTask_content=document.createTextNode(content)
    newTask.appendChild(newTask_content)

    let features_button = document.createElement("div")
    features_button.className="feature_button"
    features_button_content=document.createTextNode(nums_skills)
    features_button.appendChild(features_button_content)

    let editButton = document.createElement("div")
    editButton.className = "edit_button"
    let editButton_content=document.createTextNode("Edit")
    editButton.appendChild(editButton_content)

    let deleteButton = document.createElement("div")
    deleteButton.className="deleteButton"
    let deleteButton_content = document.createTextNode("Delete")
    deleteButton.appendChild(deleteButton_content)
    
    let light_line = document.createElement("div")
    light_line.className="lightline"

    newTask_parent.appendChild(newTask)
    newTask_parent.appendChild(editButton)
    newTask_parent.appendChild(deleteButton)
    newTask_parent.appendChild(features_button)

    taskArea.appendChild(newTask_parent)
    text_addTask.value=""
    newTask_parent.after(light_line)
}


//Clear All
clear_all.onclick=function(e){
    window.localStorage.removeItem("task")
    window.location.reload()
}
//Save
function save(){
    obj={}
    nums=0
    let tasks=document.querySelectorAll(".tasks .newTask_parent .new_task");
    console.log(tasks)

    tasks.forEach(function(e){
        nums++
        obj[nums]=[e.textContent,e.parentElement.className];
    })

    console.log(obj)
    window.localStorage.setItem("task",JSON.stringify(obj))
    window.location.reload()
}


document.onclick=function(e){
        //edit
    if(e.target.className ==="edit_button"){

        let edit_task = document.createElement("input")
        edit_task.className="edit_task"

        let curent_task = e.target.previousElementSibling
        let text_curent_task = curent_task.textContent
        curent_task.textContent=""
        edit_task.value=text_curent_task
        
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
            curent_task.textContent=text_curent_task
            edit_task.remove()
        }
    }
}


let list_replace=[]

console.log(list_replace)


window.localStorage.setItem("f",window.localStorage.getItem("f") || 0)
if(window.localStorage.getItem("f") == 1){
    brown()
}


document.addEventListener("click",function(e){
// change color
    if(e.target.className === "change_color"){
        console.log(e.target)
        if(window.localStorage.getItem("f") == 0){
            brown()
            window.localStorage.setItem("f",1)

        }else if(window.localStorage.getItem("f") ==1){
           white()
            window.localStorage.setItem("f",0)
        }
    }
//activation
    else if(e.target.className === "new_task" ){
        e.target.parentElement.classList.toggle("active")
        save()
    }
//Delete
    else if(e.target.className === "deleteButton"){
        e.target.parentElement.remove()
        save()
    }
//feature button
    else if(e.target.className === "feature_button" || e.target.className === "feature_button feature_clicked"){
        number_click=e.target.textContent  
        console.log(number_click)
        
        if (list_replace.length === 0){
            list_replace.push(number_click)
            e.target.classList.toggle("feature_clicked")
        }
        else{
            if(list_replace[0] === number_click){
                list_replace=[]
                e.target.classList.toggle("feature_clicked")
            }
            else{
                list_replace.push(number_click)
                replace_skills()
            }
        } 

        console.log(list_replace)
    }
// light line
    else if(e.target.className ==="lightline" && list_replace.length === 1){
        console.log(e.target)
        previous_number=e.target.previousElementSibling.lastElementChild.textContent
        next_number=e.target.nextElementSibling.lastElementChild.textContent

        console.log(previous_number)
        console.log(next_number)

        list_replace.push([previous_number,next_number])
        console.log(list_replace)
        arrange_items()
    }
})

let arr_list=[]
let new_obj={}

function arrange_items(){
    for(i in obj){
        if(i == list_replace[1][1]){
          arr_list.push(list_replace[0])
        }
        else if(i == list_replace[0]){
            continue
        }
        arr_list.push(i)
    }
    console.log(arr_list)
    list_replace=[]
    new_arrange_skills()
}
function new_arrange_skills(){
    for(i in arr_list){
        console.log(+i+1,arr_list[i])
        new_obj[+i+1]=[obj[arr_list[i]][0],obj[arr_list[i]][1]]
    }
    console.log(new_obj)
    window.localStorage.setItem("task",JSON.stringify(new_obj))
    window.location.reload()
}
let tasks=document.querySelectorAll(".tasks .newTask_parent");

function replace_skills(){
    Task_parent_1 = tasks[list_replace[0] - 1]
    Task_parent_2 = tasks[list_replace[1] - 1]

    let holder=Task_parent_1.firstElementChild.textContent
    let holder_class=Task_parent_1.className

    Task_parent_1.firstElementChild.textContent = Task_parent_2.firstElementChild.textContent
    Task_parent_1.className = Task_parent_2.className

    Task_parent_2.firstElementChild.textContent = holder
    Task_parent_2.className = holder_class

    save()

}


// COLORS
function brown(){
    document.body.style.background="#582f0e"
    document.querySelector(".header").style.background=document.querySelector(".tasks").style.background ="#7f4f24"
    document.querySelector(".addTask").style.background="#c2c5aa"
    document.querySelector(".addTask").style.color="#333d29"
    document.querySelector(".text").style.background="#b6ad90"
    document.querySelector(".clear_all").style.background="#c2c5aa"
    document.querySelector(".clear_all").style.color="#333d29"
    document.querySelectorAll(".newTask_parent").forEach(function(e){
        e.style.background="#936639"
        e.firstElementChild.style.color="white"
        e.lastElementChild.style.background="#a68a64"
        e.nextElementSibling.style.background="#b6ad90"
        e.firstElementChild.nextElementSibling.style.background="#c2c5aa"
        e.firstElementChild.nextElementSibling.style.color="#333d29"
        e.lastElementChild.previousElementSibling.style.background="#c2c5aa"
        e.lastElementChild.previousElementSibling.style.color="#333d29"
    })
}
function white(){
    document.body.style.background="white"
    document.querySelector(".header").style.background=document.querySelector(".tasks").style.background ="#eee"
    document.querySelector(".addTask").style.background="cadetblue"
    document.querySelector(".addTask").style.color="white"
    document.querySelector(".text").style.background="white"
    document.querySelector(".clear_all").style.background="cadetblue"
    document.querySelector(".clear_all").style.color="white"
    document.querySelectorAll(".newTask_parent").forEach(function(e){
        e.style.background="white"
        e.firstElementChild.style.color="black"
        e.lastElementChild.style.background="#858585"
        e.nextElementSibling.style.background="#558f91"
        e.firstElementChild.nextElementSibling.style.background="cadetblue"
        e.firstElementChild.nextElementSibling.style.color="white"
        e.lastElementChild.previousElementSibling.style.background="cadetblue"
        e.lastElementChild.previousElementSibling.style.color="white"
    })
}