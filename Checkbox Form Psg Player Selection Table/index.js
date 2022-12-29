const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("form");
let playerSeleted = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = e.target;
    playerSeleted = [];
    for (let input  of inputs) {
        if (input.name == "player" && input.checked) {
            playerSeleted.push(input.value)
        }
    }
    if (playerSeleted.length < 3 ) return alert('Please select at least 3 players!');
    alert(`Congratulations you have selected: ${playerSeleted.length} player(s) \n ${playerSeleted.join(" / ")}`);
});


let playerList = [
    {"Country": "Portugal", "Player": ["Vitinha", "Mendes", "Danilo",]},
    {"Country": "Spain", "Player": ["Sarabia", "Soler"]},
    {"Country": "Brazil", "Player": ["Marquinhos", "Neymar"]},
    {"Country": "France", "Player": ["Mbappé", "Kimpembe"]},
    {"Country": "Rica", "Player": ["Navas"]},
    {"Country": "Morocco", "Player": ["Hakimi"]},
    {"Country": "Argentina", "Player": ["Messi"]},
];


const tablePlayers = $(".table-players");

playerList.forEach(object => {
    let country = object.Country;
    let players = object.Player;
    let tagCountry = `<div class="country">${country}</div>`
    tablePlayers.insertAdjacentHTML("beforeend", tagCountry + team(players));
});

function team(players) {
    let output = "";
    for (let i = 0; i < players.length; i++) {
        const element = players[i];
        output += `
        <div class="field">
            <input type="checkbox" id="${element}" name="player" value="${element}" class="checkbox">
            <label for="${element}">${element}</label>
        </div>`;
    }
    
    return output;
}

const display = $(".display"),
checkboxes = $$('input[type="checkbox"]'),
SelectBtn = $("#select-btn");

checkboxes.forEach(checkbox => {
    if (checkbox.id == "select-all") {
        checkbox.addEventListener("change", selectAll);
    } else {
        checkbox.addEventListener("change", updateDisplay);
    }
});

function selectAll(e) {
    playerSeleted = [];
    let target = e.target;
    if (target.checked) {
        display.innerHTML = "";
        let table = target.closest(".table-players");
        let allPlayer = table.querySelectorAll('input[name="player"]');
        allPlayer.forEach((player) => {
            player.checked = true;
            addAllPlayer(player);
        });
    } else {
        let table = target.closest(".table-players");
        let allPlayer = table.querySelectorAll('input[name="player"]');
        allPlayer.forEach((player) => {
            if (player.checked == true) {
                player.checked = false;
                removeAllPlayer(player);
            }
        })
    }
}

function addAllPlayer(player) {
    let box = Object.assign(document.createElement("div"), {
        className: `selected ${player.value}`
    })
    box.innerHTML = `
        <span class="title">${player.value}</span>
        <button onclick=removePlayerByBtn("${player.value}")><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></button>`;
    display.appendChild(box);
    setTimeout(() => {
        box.style.transform = "scale(1)";
    }, 200);
}

function addPlayer(e) {
    let box = Object.assign(document.createElement("div"), {
        className: `selected ${e.target.value}`
    })
    box.innerHTML = `
        <span class="title">${e.target.value}</span>
        <button onclick=removePlayerByBtn("${e.target.value}")><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></button>`;
    display.appendChild(box);
    setTimeout(() => {
        box.style.transform = "scale(1)";
    }, 200);
}

function removeAllPlayer(player) {
    let box = $(`.display .${player.value}`);
    box.style.transform = "scale(0)";
    setTimeout(() => {
        box.remove();
    }, 200);
}

function removePlayer(e) {
    playerSeleted.pop(e.target.value);
    let box = $(`.display .${e.target.value}`);
    box.style.transform = "scale(0)";
    setTimeout(() => {
        box.remove();
    }, 200);
}

function removePlayerByBtn(id) {
    playerSeleted.pop(id);
    let input = $(`.selector #${id}`);
    if (input.checked) {
        input.checked = false;
        let box = $(`.display .${id}`);
        box.style.transform = "scale(0)";
        setTimeout(() => {
            box.remove();
        }, 200);
    }
}

function updateDisplay(e) {
    if (e.target.checked) return addPlayer(e);
    let selectAll = $("#select-all");
    if (selectAll.checked) {
        selectAll.checked = false;
    }
    removePlayer(e);
}