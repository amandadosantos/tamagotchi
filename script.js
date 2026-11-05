let hunger = 100;
let happiness = 100;
let energy = 100;

const hungerBar = document.getElementById("hunger-bar");
const happinessBar = document.getElementById("happiness-bar");
const energyBar = document.getElementById("energy-bar");
const petSprite = document.getElementById("pet-sprite");
const statusText = document.getElementById("pet-status-text");

function updateStats() {
    hungerBar.style.width = `${hunger}%`;
    happinessBar.style.width = `${happiness}%`;
    energyBar.style.width = `${energy}%`;

    // Atualiza o visual com base nos atributos
    if (hunger <= 0 || happiness <= 0 || energy <= 0) {
        petSprite.textContent = "💀";
        statusText.textContent = "Game Over!";
    } else if (hunger < 30 || happiness < 30 || energy < 30) {
        petSprite.textContent = "😢";
        statusText.textContent = "Triste / Cansado";
    } else {
        petSprite.textContent = "🐶";
        statusText.textContent = "Feliz";
    }
}

function feedPet() {
    if (hunger <= 0) return;
    hunger = Math.min(100, hunger + 20);
    animateSprite();
    updateStats();
}

function playWithPet() {
    if (hunger <= 0) return;
    if (energy < 15) {
        alert("O pet está muito cansado para brincar!");
        return;
    }
    happiness = Math.min(100, happiness + 20);
    energy = Math.max(0, energy - 10);
    hunger = Math.max(0, hunger - 5);
    animateSprite();
    updateStats();
}

function sleepPet() {
    if (hunger <= 0) return;
    energy = Math.min(100, energy + 40);
    hunger = Math.max(0, hunger - 10);
    animateSprite();
    updateStats();
}

function resetPet() {
    hunger = 100;
    happiness = 100;
    energy = 100;
    updateStats();
}

function animateSprite() {
    petSprite.style.transform = "scale(1.2)";
    setTimeout(() => {
        petSprite.style.transform = "scale(1)";
    }, 200);
}

// Diminui os atributos com o passar do tempo (a cada 3 segundos)
setInterval(() => {
    if (hunger > 0 && happiness > 0 && energy > 0) {
        hunger = Math.max(0, hunger - 5);
        happiness = Math.max(0, happiness - 3);
        energy = Math.max(0, energy - 2);
        updateStats();
    }
}, 3000);

// Inicializa a tela
updateStats();