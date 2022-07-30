const p = document.getElementById("p")
const new_score = document.getElementById("new_score")
const btn = document.getElementById("btn")
const highscore = document.getElementById("highscore")
const btn_start = document.getElementById("btn_start")
const number_of_tries = document.getElementById("number_of_tries")
const container_div = document.getElementById("container_div")



let highscore_arry = []
let time_left = 10
p.textContent = time_left
let score = 0
let  countdown_started = false
p.visibility = "hidden"



btn_start.addEventListener("click", function()
{
    if(!countdown_started){
        startCountdown()
        p.style.visibility = "visible"
    }
})


container_div.addEventListener("click", function(event)
{
        if(countdown_started)
        {
            if(event.target.id == "btn")
            {
                incrementScore()
                teleportation()
                btnSizeDecresing()
            }
            else
            {
                decrementBtnScore()
                container_div.style.backgroundColor = "red"
                setTimeout(containerDivBgColorChange, 100)
            }
            
        } 
})



function startCountdown()
{
    btn.disabled = false;
    btn_start.style.display = "none"
    let interval = setInterval(function(){
        if(time_left > 0){
            time_left -= 1
            p.textContent = time_left
        }
        else{
            clearInterval(interval)
            countdownEnded()
        }
    
    },1000)
    countdown_started = true
}

function countdownEnded()
{
    btn.style.height = "100px"
    btn.style.width = "100px"
    btn.disabled = true;
    btn.style.top = 0
    btn.style.left = 0
    new_score.textContent = "score = " + score
    highscore_arry.push(score)
    if(score > localStorage.getItem("highscore")){
        localStorage.setItem("highscore", score)
        highscore.textContent = "Highscore = " + localStorage.getItem("highscore")
    }
    else{
        highscore.textContent = "Highscore = " + localStorage.getItem("highscore")
    }
    score = 0
    time_left = 10
    p.textContent = time_left
    p.style.visibility = "hidden"
    btn_start.style.display = "block"
    btn.textContent = score
    countdown_started = false
    number_of_tries.textContent ="Number of tries = " + Math.max(highscore_arry.length)
    
}

function incrementScore()
{
    score ++
    btn.textContent = score
}

function decrementBtnScore()
{   
    if(score > 0)
    {
        score --
        btn.textContent = score  
    } 
}

function containerDivBgColorChange()
{
    console.log(container_div)
    container_div.style.backgroundColor = "rgb(20, 20, 100)"
    
}


function teleportation(){
    if(countdown_started == true)
    {
        let container_div_width = container_div.offsetWidth
        let container_div_height = container_div.offsetHeight

        x = Math.floor(Math.random() * (container_div_width - btn.offsetWidth )) + "px"
        y = Math.floor(Math.random() * (container_div_height - btn.offsetHeight)) + "px"
        btn.style.top = y
        btn.style.left = x

    }
}


function btnSizeDecresing()
{
    let btn_width = btn.offsetWidth
    let btn_heigth = btn.offsetHeight

    btn_heigth -= 8
    btn_width -= 8

    btn.style.height = `${btn_heigth}px`
    btn.style.width = `${btn_width}px`
}
