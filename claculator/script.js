const keysList = document.querySelectorAll(".key")



for (let i = 0; i < keysList.length; i++) {
    document.querySelectorAll('.key')[i].addEventListener('click', ()=>{
        document.querySelectorAll('.key')[i].classList.add('scale')
        setTimeout(() => {
            document.querySelectorAll('.key')[i].classList.remove('scale')
        }, 200);
    })
    
}

let equation = ''
let displayvalue = ''

for (let i = 0; i < keysList.length; i++) {
    document.querySelectorAll('.key')[i].addEventListener('click', ()=>{
       if (document.querySelector('input').value === 'syntax error'||document.querySelector('input').value === 'undefined') {
        document.querySelector('input').value = ''
        equation = ""
       }
    })
    
}


for (let i = 0; i < keysList.length; i++) {
   document.querySelectorAll('.key')[i].addEventListener('click', ()=>{
    const eValue =  document.querySelectorAll('.key')[i].innerHTML
   
    if (eValue==='Enter'||eValue==='clear'||eValue==='del'||eValue==='ans'||eValue==='x'||eValue==='x²'||eValue==='√') {
        
        if (eValue==='x²') {
            displayvalue = document.querySelector('input').value
        displayvalue = displayvalue + document.querySelectorAll('.key')[i].innerHTML
        document.querySelector('input').value = displayvalue
        equation = equation+"**2"
        }
        if (eValue==='x') {
           
        displayvalue = document.querySelector('input').value
        displayvalue = displayvalue + document.querySelectorAll('.key')[i].innerHTML
        document.querySelector('input').value = displayvalue
        equation = equation + "*"
        }
        if (eValue==='√') {
           
        displayvalue = document.querySelector('input').value
        displayvalue = displayvalue + document.querySelectorAll('.key')[i].innerHTML
        document.querySelector('input').value = displayvalue
        equation = equation + "**0.5"
        }
        if (eValue === "clear") {
            document.querySelector("input").value = ""
            equation = ""
            document.querySelector("p").innerHTML = ""
        }

        if (eValue == "del") {
            displayvalue = displayvalue.slice(0,-1)
            document.querySelector('input').value = displayvalue
            equation = equation.slice(0,-1)
        }


        if (eValue === "Enter"||eValue === "ans") {
            console.log(equation)
            Answer(equation)
        }

    }else{
        equation = equation + document.querySelectorAll('.key')[i].innerHTML
        displayvalue = document.querySelector('input').value
        displayvalue = displayvalue + document.querySelectorAll('.key')[i].innerHTML
        document.querySelector('input').value = displayvalue
    }
   })
}

function Answer(equation) {
    document.querySelector("p").innerHTML = displayvalue
        try {
            document.querySelector("input").value = eval(equation)
            console.log(eval(equation))
            equation = eval(equation)
        } catch (error) {
            document.querySelector("input").value = "syntax error"
            console.log(displayvalue)
            displayvalue = ""
            equation = ""
           
        }
        
}