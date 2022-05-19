const p = document.getElementById("p")
const new_score = document.getElementById("new_score")
const btn = document.getElementById("btn")
const highscore = document.getElementById("highscore")
const btn_start = document.getElementById("btn_start")
const number_of_tries = document.getElementById("number_of_tries")
var arry = []
let time_left = 3
p.textContent = time_left
let score = 0
let  countdown_started = false



btn_start.addEventListener("click", function(){
    if(!countdown_started){
        startCountdown()
        p.style.display = "block"
    }
})

btn.addEventListener("click", function(){
    if(countdown_started){
        incrementScore()
    }
    
})

function startCountdown(){
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
function countdownEnded(){
    document.querySelector('#btn').disabled = true;
    new_score.textContent = "score = " + score
    arry.push(score)
    if(score > localStorage.getItem("highscore")){
        localStorage.setItem("highscore", score)
        highscore.textContent = "Highscore = " + localStorage.getItem("highscore")
    }
    else{
        highscore.textContent = "Highscore = " + localStorage.getItem("highscore")
    }
    score = 0
    time_left = 3
    p.textContent = time_left
    p.style.display = "none"
    btn_start.style.display = "block"
    btn.textContent = score
    countdown_started = false
    number_of_tries.textContent ="Number of tries = " + Math.max(arry.length)
    
    
}

function incrementScore(){
    score ++
    btn.textContent = score
}











// var div = document.getElementById("div")
// let width = 100
// let height = 100

// divInterval = setInterval(function(){
    
//     div.style.width = width + "px"
//     div.style.height = height + "px"
//     width -= 2
//     height -= 2
//     console.log(div.style.width)
// }, 100)

// div.addEventListener("click", function(){
//     width += 5
//     height += 5
// })