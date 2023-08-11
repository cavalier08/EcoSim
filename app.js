class Organism {
    constructor(name, count, huntProb, lowFoodLimit, currentFoodCount, foodUsage, matingProb, foodSource, foodAvailable) {
        this.name = name;
        this.count = count;
        this.huntProb = huntProb;
        this.lowFoodLimit = lowFoodLimit;
        this.currentFoodCount = currentFoodCount;
        this.foodUsage = foodUsage;
        this.matingProb = matingProb;
        this.foodSource = foodSource;
        this.foodAvailable = foodAvailable;
    }

    dailyRoutine(ecosystem) {
        this.currentFoodCount -= this.foodUsage * this.count;

        if (this.currentFoodCount <= this.lowFoodLimit * this.count) {
            this.hunt(ecosystem);
        }

        this.reproduce();

        this.count = Math.max(0, this.count); // Ensure count never goes below 0

        if (this.currentFoodCount <= 0) {
            this.count--;
            this.currentFoodCount = 0; 
        }
    }

    hunt(ecosystem) {
        let potentialFood = ecosystem.filter(org => this.foodSource.includes(org.name));

        for (let food of potentialFood) {
            while (this.currentFoodCount <= this.lowFoodLimit * this.count && food.count > 0) {
                if (Math.random() < this.huntProb) {
                    this.currentFoodCount += this.foodAvailable;
                    food.count--;
                }
            }
        }
    }

    reproduce() {
        if (Math.random() < this.matingProb) {
            this.count++;
        }
    }
}

const ecosystem = [
    new Organism("Rabbit", 50, 0.7, 20, 100, 2, 0.5, ["Grass"], 10),
    new Organism("Fox", 10, 0.4, 10, 50, 3, 0.4, ["Rabbit"], 30),
    new Organism("Grass", 1000, 0, 0, 1000, 1, 0.6, [], 0),
    new Organism("Turtle", 100, 0.6, 100, 20, 2, 0.2, ["Grass"], 20)
];

let dayCount = 0;
let history = {
    Rabbit: [],
    Fox: [],
    Grass: [],
    Turtle: []
};

let chart;

function simulateDay(ecosystem) {
    // Shuffle the ecosystem array to randomize the order of hunting each day
    let shuffledEcosystem = ecosystem.sort(() => Math.random() - 0.5);

    shuffledEcosystem.forEach(org => org.dailyRoutine(ecosystem));
}

function initializeGraph() {
    const ctx = document.getElementById('populationChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Rabbit',
                borderColor: 'blue',
                data: [],
                fill: false
            }, {
                label: 'Fox',
                borderColor: 'red',
                data: [],
                fill: false
            }, {
                label: 'Grass',
                borderColor: 'green',
                data: [],
                fill: false
            }, {
                label: 'Turtle',
                borderColor: 'Cyan',
                data: [],
                fill: false
            }]
        }
    });
}

function updateUI() {
    ecosystem.forEach(org => {
        document.getElementById(`${org.name}-count`).textContent = org.count;
    });
}

function updateGraph() {
    chart.data.labels.push(dayCount);
    chart.data.datasets[0].data.push(history.Rabbit[dayCount - 1]);
    chart.data.datasets[1].data.push(history.Fox[dayCount - 1]);
    chart.data.datasets[2].data.push(history.Grass[dayCount - 1]);
    chart.data.datasets[3].data.push(history.Turtle[dayCount - 1]);
    chart.update();
}

function checkFoodChainBroken() {
    return ecosystem.some(org => org.count <= 0);
}

function runSimulationDayByDay() {
    if (!checkFoodChainBroken()) {
        simulateDay(ecosystem);
        dayCount++;

        ecosystem.forEach(org => {
            history[org.name].push(org.count);
        });

        updateUI();
        updateGraph();

        setTimeout(runSimulationDayByDay, 200);
    } else {
        alert(`The food chain is broken on day ${dayCount}!`);
    }
}

initializeGraph();
runSimulationDayByDay();
