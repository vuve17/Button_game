const p = document.getElementById("p")
const new_score = document.getElementById("new_score")
const btn = document.getElementById("btn")
const highscore = document.getElementById("highscore")
const btn_start = document.getElementById("btn_start")
const number_of_tries = document.getElementById("number_of_tries")
const container_div = document.getElementById("container_div")



console.log(document.getElementById("btn").offsetHeight)


var highscore_arry = []
let time_left = 10
p.textContent = time_left
let score = 0
let  countdown_started = false



btn_start.addEventListener("click", function()
{
    if(!countdown_started){
        startCountdown()
        p.style.display = "block"
    }
})


container_div.addEventListener("click", function(event)
{
        if(countdown_started)
        {
            if(event.target.id == "btn")
            {
                incrementScore()
                Teleportation()
                decreaseBtn()
            }
            else
            {
                Teleportation()
                decreaseBtn()
                decrementBtn()
            }
            
        } 
})



function startCountdown()
{
    document.querySelector('#btn').disabled = false;
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
    document.querySelector('#btn').disabled = true;
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
    p.style.display = "none"
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

function decrementBtn()
{   
    if(countdown_started)
    {
        score --
        btn.textContent = score
    } 
}


function Teleportation(){
    if(countdown_started == true)
    {
        let container_div_width = parseInt(container_div.offsetWidth, 10);
        let container_div_height = parseInt(container_div.offsetHeight, 10);

        x = Math.floor(Math.random() * (container_div_width - btn.offsetWidth )) + "px"
        y = Math.floor(Math.random() * (container_div_height - btn.offsetHeight)) + "px"
        btn.style.top = y
        btn.style.left = x

    }
}


function decreaseBtn()
{
    let btn_width = btn.offsetWidth
    let btn_heigth = btn.offsetHeight

    btn_heigth -= 8
    btn_width -= 8

    btn.style.height = `${btn_heigth}px`
    btn.style.width = `${btn_width}px`
}
