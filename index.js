let bracketList = document.querySelector(".bracketList")
let hiddenBracket = document.querySelector("div.hidden-bracket")
let matchup1 = document.querySelector(".matchup-1")
let bracket = document.querySelector("section#bracket")
let getBracketButton = document.getElementById("bracketsButton")
let submitButton = document.getElementById("submitButton")
let loginForm = document.querySelector(".loginForm")
let newBracketForm = document.getElementById("newBracketForm")
let newBracketButton = document.getElementById("newBracketButton")
let bracketSubmit = document.getElementById("newBracketSubmit")
let updateBracketButton = document.getElementById("updateBracketButton")

submitButton.addEventListener("click", login)
bracket.addEventListener("click", moveTeam)
bracketList.addEventListener('click', showBracket)
getBracketButton.addEventListener('click', getYourBrackets)
bracketSubmit.addEventListener('click', submitBracket)
newBracketButton.addEventListener('click', function(){
    newBracketForm.className = ""
})
updateBracketButton.addEventListener('click', updateBracket)
let user 
let currentBracket

function updateBracket(){
    currentBracket.position9 = document.getElementById('team9').innerHTML
    currentBracket.position10 = document.getElementById('team10').innerHTML
    currentBracket.position11 = document.getElementById('team11').innerHTML
    currentBracket.position12 = document.getElementById('team12').innerHTML
    currentBracket.position13 = document.getElementById('team13').innerHTML
    currentBracket.position14 = document.getElementById('team14').innerHTML
    currentBracket.position15 = document.getElementById('team15').innerHTML
    fetch(`http://localhost:3000/brackets/${currentBracket.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: currentBracket.id,
            position9: currentBracket.position9,
            position10: currentBracket.position10,
            position11: currentBracket.position11,
            position12: currentBracket.position12,
            position13: currentBracket.position13,
            position14: currentBracket.position14,
            position15: currentBracket.position15,
        })
    })
}

function submitBracket(e){
    e.preventDefault()
    let newBracket = new Bracket(
        "",
        document.getElementById('bracketName').value,
        8,
        document.getElementById('newteam1').value,
        document.getElementById('newteam2').value,
        document.getElementById('newteam3').value,
        document.getElementById('newteam4').value,
        document.getElementById('newteam5').value,
        document.getElementById('newteam6').value,
        document.getElementById('newteam7').value,
        document.getElementById('newteam8').value
    )
    fetch("http://localhost:3000/brackets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: newBracket.name,
            total_teams: 8,
            position1: newBracket.position1,
            position2: newBracket.position2,
            position3: newBracket.position3,
            position4: newBracket.position4,
            position5: newBracket.position5,
            position6: newBracket.position6,
            position7: newBracket.position7,
            position8: newBracket.position8,
            code: newBracket.code,
            user_id: newBracket.user_id,
        })
        })
        .then(function(){
            fetchBrackets()
        })
        document.getElementById('bracketName').value = ""
        document.getElementById('newteam1').value = ""
        document.getElementById('newteam2').value = ""
        document.getElementById('newteam3').value = ""
        document.getElementById('newteam4').value = ""
        document.getElementById('newteam5').value = ""
        document.getElementById('newteam6').value = ""
        document.getElementById('newteam7').value = ""
        document.getElementById('newteam8').value = ""

}
function getYourBrackets(e){
    fetchBrackets()

}
function login(e){
    e.preventDefault()
    let useremail = document.getElementById("email").value
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
           email: useremail
        })
        })
        .then(resp => resp.json())
        .then(function(json){
            user = new User(json.id, json.email)
            document.getElementById("useremail").innerHTML = `${user.email}`
        })
    loginForm.className = "hidden"
    getBracketButton.className = ""
    newBracketButton.className = ""

}

function fetchBrackets(){
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(resp => resp.json())
    .then(json => renderBracketNames(json))
}

function fetchBracket(bracketId){
    fetch(`http://localhost:3000/brackets/${bracketId}`)
    .then(resp => resp.json())
    .then(json => getTeamNames(json))
}

function renderBracketNames(user){
    bracketList.innerHTML = ""
    user.brackets.forEach(bracket => {
        bracketList.innerHTML += `<li data-id = ${bracket.id}>${bracket.name}</li>`
    })
}

function getTeamNames(bracket){
    currentBracket = new Bracket(
        bracket.id,
        bracket.name,
        bracket.total_teams,
        bracket.position1,
        bracket.position2,
        bracket.position3,
        bracket.position4,
        bracket.position5,
        bracket.position6,
        bracket.position7,
        bracket.position8,
        bracket.code,
        bracket.user_id
    )
    document.getElementById("team1").innerHTML = bracket.position1
    document.getElementById("team2").innerHTML = bracket.position2
    document.getElementById("team3").innerHTML = bracket.position3
    document.getElementById("team4").innerHTML = bracket.position4
    document.getElementById("team5").innerHTML = bracket.position5
    document.getElementById("team6").innerHTML = bracket.position6
    document.getElementById("team7").innerHTML = bracket.position7
    document.getElementById("team8").innerHTML = bracket.position8
    document.getElementById("team9").innerHTML = bracket.position9
    document.getElementById("team10").innerHTML = bracket.position10
    document.getElementById("team11").innerHTML = bracket.position11
    document.getElementById("team12").innerHTML = bracket.position12
    document.getElementById("team13").innerHTML = bracket.position13
    document.getElementById("team14").innerHTML = bracket.position14
    document.getElementById("team15").innerHTML = bracket.position15
    
}

function showBracket(e){
    let bracketId = e.target.dataset.id
    fetchBracket(bracketId)
    hiddenBracket.className = ""

}
// && document.getElementById("team9").innerHTML === "EMPTY")
function moveTeam(e){
    if (e.target.parentNode.className === "matchup-1"){
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

