let bracketList = document.querySelector(".bracketList")


function fetchBrackets(){
    return fetch(`http://localhost:3000/users/${id}`)
    .then(resp => resp.json())
    .then(json => renderBrackets(json))
}

function renderBrackets(brackets){
    
    brackets.forEach(bracket => {

        bracketList.innerHTML += `<li>${bracket.name}</li>`
    })
}

function showBracket(e){
    console.log(e.target)
}

bracketList.addEventListener('click', showBracket)
fetchBrackets()

