// DOM #main div element
var main = document.getElementById('main');

// **** Your JavaScript code goes here ****
characters = [
    {
        "name": "Bran Stark",
        "status": "Alive",
        "current_location": "Fleeting White Walkers",
        "power_ranking": 7,
        "house": "stark",
        "probability_of_survival": 98
    },
    {
        "name": "Arya Stark",
        "status": "Alive",
        "current_location": "Back in Westeros",
        "power_ranking": 8,
        "house": "stark",
        "probability_of_survival": 99
    },
    {
        "name": "Sansa Stark",
        "status": "Alive",
        "current_location": "Winterfell",
        "power_ranking": 10,
        "house": "stark",
        "probability_of_survival": 83
    },
    {
        "name": "Robb Stark",
        "status": "Dead - Red Wedding S3E9",
        "current_location": "-",
        "power_ranking": -1,
        "house": "stark",
        "probability_of_survival": 0
    }
]

function halfSurvival(character) {
    return character.probability_of_survival / 2;
}

for (i = 0; i < characters.length; i++) {
    if (characters[i].name != "Bran Stark") {
        characters[i].probability_of_survival = halfSurvival(characters[i]);
    }
}

function debugCharacters() {
    for (i = 0; i < characters.length; i++) {
        console.log(characters[i].probability_of_survival);
    }
}

debugCharacters();

function createDiv() {
    for (i = 0; i < characters.length; i++) {
        var character = document.createElement("div");
        main.appendChild(character);
        character.className = "character-div";

        var name = document.createElement("p");
        name.textContent = characters[i].name;
        character.appendChild(name);
        name.className = "character-name";

        var house = document.createElement("p");
        house.textContent = characters[i].house;
        character.appendChild(house);
        house.className = "character-house";

        var probability_of_survival = document.createElement("p");
        probability_of_survival.textContent = characters[i].probability_of_survival;
        character.appendChild(probability_of_survival);
        probability_of_survival.className = "character-survival";

        var status = document.createElement("p");
        status.textContent = characters[i].status;
        character.appendChild(status);
        status.className = "character-status";

        // horizontal lines
        var hr = document.createElement("hr");
        main.appendChild(hr);
    }
}

createDiv();



