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


const playerList = [
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
checkboxes = $$('.selector .field:not(.select-all) input'),
selectAllBtn = $("#select-all");
let tableSelection = [];
console.log(checkboxes);

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        checkboxes.forEach(i => {
            tableSelection.push(i.checked);
        });
        if(tableSelection.includes(false)) {
            selectAllBtn.checked = false;
        } else {
            selectAllBtn.checked = true;
        }
        tableSelection = [];
        updateDisplay(this);
    })
});

selectAllBtn.addEventListener('change', function () {
    display.innerHTML = '';
    if (this.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            updateDisplay(checkbox);
        })
    } else {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            display.innerHTML = '';
        })
    }
})

function addPlayer(e) {
    let box = Object.assign(document.createElement("div"), {
        className: `selected`
    })
    box.setAttribute('data-value', e.value);
    box.innerHTML = `
        <span class="title">${e.value}</span>
        <button onclick=removePlayerByBtn("${e.value}")><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></button>`;
    display.appendChild(box);
    setTimeout(() => {
        box.style.transform = "scale(1)";
    }, 200);
}

function removePlayer(e) {
    let target = $(`.selected[data-value="${e.value}"]`);
    target.style.transform = "scale(0)";
    setTimeout(() => {
        display.removeChild(target);
    }, 200);
}

function removePlayerByBtn(id) {
    let input = $(`input#${id}`);
    input.click();
    tableSelection = [];
}

function updateDisplay(e) {
    if (e.checked) return addPlayer(e);
    removePlayer(e);
}
