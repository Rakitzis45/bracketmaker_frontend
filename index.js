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
let searchBracketButton = document.getElementById("searchButton")
let searchBracketContainer = document.getElementById('searchBracketContainer')

searchBracketButton.addEventListener('click', searchBracket)
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

function searchBracket(e) {
    e.preventDefault()
    searchAllBrackets()
}
function searchAllBrackets(){
    let bracketCode = parseInt(document.getElementById('bracketSearch').value)
    fetch('http://localhost:3000/brackets')
    .then(resp => resp.json())
    .then(function(json){
        let bracket = json.find(bracket => bracket.code === bracketCode)
        let foundBracket = new Bracket(
            bracket.id, 
            bracket.name, 
            8,
            bracket.position1,
            bracket.position2,
            bracket.position3,
            bracket.position4,
            bracket.position5,
            bracket.position6,
            bracket.position7,
            bracket.position8,
            bracket.position9,
            bracket.position10,
            bracket.position11,
            bracket.position12,
            bracket.position13,
            bracket.position14,
            bracket.position15,
            bracket.code,
            bracket.user_id
        )
        searchBracketContainer.innerHTML = ""
        let newSection = document.createElement('section')
        newSection.id = 'bracket'
        newSection.innerHTML = ` 
            <div class=round1>
            <h4 class=round-details>Quarters</h4>
            <ul class="matchup-1">
                <li class="team">${foundBracket.position1}</li>
                <li class="team">${foundBracket.position2}</li>
            </ul>
            <ul class="matchup-2">
                <li class="team">${foundBracket.position3}</li>
                <li class="team">${foundBracket.position4}</li>
            </ul>
            <ul class="matchup-3">
                <li class="team">${foundBracket.position5}</li>
                <li class="team">${foundBracket.position6}</li>
            </ul>
            <ul class="matchup-4">
                <li class="team">${foundBracket.position7}</li>
                <li class="team">${foundBracket.position8}</li>
            </ul>
        </div>
    
        <div class=round2>
            <div class="matchups">
            <h4 class=round-details>Semi-Finals</h4>
            <ul class="matchup-5">
                <li class="team">${foundBracket.position9}</li>
                <li class="team">${foundBracket.position10}</li>
            </ul>
            <ul class="matchup-6">
                <li class="team">${foundBracket.position11}</li>
                <li class="team">${foundBracket.position12}</li>
            </ul>
            </div>
        </div>
    
        <div class=round3>
            <h4 class=round-details>Finals</h4>
            <ul class="matchup-7">
                <li class="team">${foundBracket.position13}</li>
                <li class="team">${foundBracket.position14}</li>
            </ul>
        </div>
    
        <div class=round4>
            <h4 class=round-details>Champion</h4>
            <ul>
                <li class="team">${foundBracket.position15}</li>
            </ul>
        </div>
        `     
        searchBracketContainer.appendChild(newSection)
    })
    
}





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
    newBracket.user_id = user.id
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
        bracketList.innerHTML += `<li data-id = ${bracket.id}>${bracket.name}: Bracket Code: ${bracket.code}</li>`
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

