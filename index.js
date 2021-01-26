let bracketList = document.querySelector(".bracketList")
let hiddenBracket = document.querySelector("div.hidden-bracket")
let matchup1 = document.querySelector(".matchup-1")
let bracket = document.querySelector("section#bracket")

let submitButton = document.getElementById("submitButton")

submitButton.addEventListener("click", login)
bracket.addEventListener("click", moveTeam)
bracketList.addEventListener('click', showBracket)

function login(e){
    e.preventDefault()
    let email = document.getElementById("email").value
    let user = new User(email)
    findOrSignup(user)
    debugger
}

function findOrSignup(user){
    debugger

  
}

function fetchBrackets(){
    fetch('http://localhost:3000/users/1')
    .then(resp => resp.json())
    .then(json => renderBracketNames(json))
}

function fetchBracket(bracketId){
    fetch(`http://localhost:3000/brackets/${bracketId}`)
    .then(resp => resp.json())
    .then(json => getTeamNames(json))
}

function renderBracketNames(user){
    user.brackets.forEach(bracket => {
        bracketList.innerHTML += `<li data-id = ${bracket.id}>${bracket.name}</li>`
    })
}

function getTeamNames(bracket){
    document.getElementById("team1").innerHTML = bracket.position1
    document.getElementById("team2").innerHTML = bracket.position2
    document.getElementById("team3").innerHTML = bracket.position3
    document.getElementById("team4").innerHTML = bracket.position4
    document.getElementById("team5").innerHTML = bracket.position5
    document.getElementById("team6").innerHTML = bracket.position6
    document.getElementById("team7").innerHTML = bracket.position7
    document.getElementById("team8").innerHTML = bracket.position8
    let newTeam = new Bracket()
}

function showBracket(e){
    console.log(e.target.dataset.id)
    let bracketId = e.target.dataset.id
    fetchBracket(bracketId)
    hiddenBracket.className = ""

}

function moveTeam(e){
    if (e.target.parentNode.className === "matchup-1" && document.getElementById("team9").innerHTML === "EMPTY"){
        document.getElementById("team9").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-2"){
        document.getElementById("team10").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-3"){
        document.getElementById("team11").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-4"){
        document.getElementById("team12").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-5"){
        document.getElementById("team13").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-6"){
        document.getElementById("team14").innerHTML = e.target.innerHTML
    } else if (e.target.parentNode.className === "matchup-7"){
        document.getElementById("team15").innerHTML = e.target.innerHTML
    } 


}

fetchBrackets()
