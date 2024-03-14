const data = [
]

let updateElement = {}

const DisplayList = () => {
    
    const PendingData = data.filter((item) => {
        return !item.completed
    })
    document.querySelector(".tasks-pending").innerHTML = PendingData.length!=0?PendingData.map((item) => {
        return `
    <div class="task">
            <p id="title">${item.title}</p>
            <p id="desc">${item.desc}</p>
        <div class="icons">
            <div id="mark" class="icon" title="mark as complited"><i class="fa-solid fa-square-check"></i></div> 
            <div id="edit" class="icon" title="edit"><i class="fa-solid fa-pen"></i></div> 
             <div id="delete" class="icon" title="delete"><i class="fa-solid fa-trash"></i></div>
        </div>
        <div class="dateTime">
            <p class="date">${item.date}</p>
            <p class="time">${item.time}</p>
        </div>
    </div>
        `
    }):`
    <div class="task">  <p id="title"> No Pending tasks</p> </div>
    `
    const CompletedData = data.filter((item) => {
        return item.completed
    })
    document.querySelector(".tasks-complited").innerHTML = CompletedData.length!=0?CompletedData.map((item) => {
        return `
    <div class="task">
            <p id="title">${item.title}</p>
            <p id="desc">${item.desc}</p>
        <div class="icons">
            <div id="mark" class="icon completed" title="mark as incomplite"><i class="fa-solid fa-square-check"></i></div> 
            <div id="edit" class="icon" title="edit"><i class="fa-solid fa-pen"></i></div> 
            <div id="delete" class="icon" title="delete"><i class="fa-solid fa-trash"></i></div>
        </div>
        <div class="dateTime">
            <p class="date">${item.date}</p>
            <p class="time">${item.time}</p>
        </div>
    </div>
        `
    }):`
    <div class="task">  <p id="title"> No Completed tasks</p> </div>
    `
}


document.querySelector("#AddBtn").addEventListener("click", function () {
    const title = document.querySelector("#title").value
    const desc = document.querySelector("#desc").value
    const date = new Date()
    if (title != "") {
        data.push({
            title: title,
            desc: desc,
            completed: false,
            date: date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear(),
            time: date.getHours()+":"+date.getMinutes()
        })
        document.querySelector("#title").value = ''
        document.querySelector("#desc").value = ''
        DisplayList(data)
    }
    else {
        alert("Add Title")
        DisplayList(data)
    }
})


document.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest("#delete");
    const editBtn = e.target.closest("#edit");
    const markBtn = e.target.closest("#mark");
    console.log(deleteBtn);
    if (deleteBtn) {
        var firstPrent = deleteBtn.parentElement;
        var listItem = firstPrent.parentElement
        var itemtitle = listItem.querySelector("#title").innerText
       
        var itemdesc = listItem.querySelector("#desc").innerText
        
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
           
            if (element.title === itemtitle && element.desc === itemdesc) {
                
                itemIndex = data.indexOf(element)
               
                if (itemIndex > -1) {
                    data.splice(itemIndex, 1)
                }
            }

        }
        DisplayList(data)
    }
    if (editBtn) {
    document.querySelector(".addBtn").classList.add("btnhide")
    document.querySelector(".updateBtn").classList.remove("btnhide")
    console.log(document.querySelector("#AddBtn").classList)
    console.log(document.querySelector("#update").classList)
    var firstPrent = editBtn.parentElement;
    var listItem = firstPrent.parentElement
    var itemtitle = listItem.querySelector("#title").innerText
    console.log(itemtitle)
    var itemdesc = listItem.querySelector("#desc").innerText
    console.log(itemdesc)
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log(element)
        if (element.title === itemtitle && element.desc === itemdesc) {
            console.log(element)
            updateElement = element
            document.querySelector("#title").value = itemtitle
            document.querySelector("#desc").value = itemdesc
        }

    }
    DisplayList(data)
    }
    if (markBtn) {
        console.log(markBtn.parentElement.parentElement)
        var firstPrent = markBtn.parentElement;
        var listItem = firstPrent.parentElement
        var itemtitle = listItem.querySelector("#title").innerText
      
        var itemdesc = listItem.querySelector("#desc").innerText
     
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
          
            if (element.title === itemtitle && element.desc === itemdesc) {
               
                itemIndex = data.indexOf(element)
                
                if (itemIndex > -1) {
                   
                   data[itemIndex].completed = !data[itemIndex].completed
                  
                }
            }

        }
        DisplayList(data)
    }
});


document.querySelector("#update").addEventListener("click", ()=>{
    const updatedtitle = document.querySelector("#title").value
    const updateddesc = document.querySelector("#desc").value
    console.log(updatedtitle)
    if (title != "") {
        itemIndex = data.indexOf(updateElement)
        data[itemIndex].title = updatedtitle
        data[itemIndex].desc = updateddesc
        document.querySelector("#title").value = ''
        document.querySelector("#desc").value = ''
        document.querySelector(".addBtn").classList.remove("btnhide")
    document.querySelector(".updateBtn").classList.add("btnhide")
        DisplayList(data)
    }
    else {
        alert("Add Title")
        DisplayList(data)
    }
})

DisplayList(data)

