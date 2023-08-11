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

        if (this.name === "Grass" || this.name === "Weed") {
            this.reproduce();
        } else {
            this.reproduce();
        }

        this.count = Math.max(0, this.count);

        if (this.currentFoodCount <= 0) {
            this.count = Math.max(this.count - 1, 0);
            this.currentFoodCount = 0;
        }
    }

    set setHuntProb(value) {
        this.huntProb = value;
    }    
    hunt(ecosystem) {
        let potentialFood = ecosystem.filter(org => this.foodSource.includes(org.name));
        const MAX_HUNT_ATTEMPTS = 5;  // limit to the number of hunting attempts
    
        for (let food of potentialFood) {
            let attempts = 0;
    
            while (this.currentFoodCount <= this.lowFoodLimit * this.count && food.count > 0 && attempts < MAX_HUNT_ATTEMPTS) {
                if (Math.random() < this.huntProb) {
                    this.currentFoodCount += this.foodAvailable;
                    food.count--;
                }
    
                attempts++;
            }
        }
    }
    
    
    
    reproduce() {
        const freeLand = MAX_LAND_CAPACITY - landUsage;
        const reproductionPotential = Math.floor(this.count * this.matingProb);
        const actualReproduction = Math.min(reproductionPotential, freeLand);

        if (this.name !== "Grass" && this.name !== "Weed" && this.currentFoodCount < this.foodUsage * this.count) {
            // If it's an animal and it doesn't have enough food, then reproduction does not occur
            return;
        }

        this.count += actualReproduction;
        landUsage += actualReproduction;
    }
}

const MAX_LAND_CAPACITY = 5000;

const ecosystem = [
    new Organism("Rabbit", 50, 0.45, 100, 200, 1, 0.5, ["Grass", "Weed"], 1),
    new Organism("Fox", 10, 0.35, 10, 50, 3, 0.4, ["Rabbit"], 30),
    new Organism("Grass", 1200, 0, 0, 4000, 0.2, 0.6, [], 0),
    new Organism("Weed", 500, 0, 0, 1000, 0.2, 0.65, [], 0)
];



// ... The Organism class and ecosystem array are as provided above ...

const events = [
    {
        name: "Drought",
        duration: 3,
        effect: (ecosystem) => {
            let rabbit = ecosystem.find(org => org.name === "Rabbit");
            if (rabbit) {
                rabbit.originalHuntProb = rabbit.huntProb;
                rabbit.huntProb *= 0.7;
            }
        },
        endEffect: (ecosystem) => {
            let rabbit = ecosystem.find(org => org.name === "Rabbit");
            if (rabbit && rabbit.originalHuntProb) {
                rabbit.huntProb = rabbit.originalHuntProb;
            }
        },
        message: "A drought has occurred! Droughts severely affect the availability of water, which impacts both plants and animals. Without enough water, plants may not grow as fast or even die, leading to a decrease in food availability for herbivores like rabbits. As you'll see, this can cascade and impact predators like foxes too."
    },
    // ... other events ...
];

let currentEvent = null;
let daysRemaining = 0;
function ecosystemIntroduction() {
    alert("Welcome to the ecosystem simulation! In this virtual environment, we'll observe the interactions between rabbits, foxes, grass, and weeds. Let's see how they co-exist and influence each other's populations.");
}
function checkSignificantChange(org, prevCount) {
    const currentCount = org.count;
    const percentageChange = Math.abs((currentCount - prevCount) / prevCount);

    if (percentageChange > 0.5 && currentCount < 10) {
        alert(`${org.name}s are on the verge of extinction! There are only ${currentCount} left.`);
    } else if (percentageChange > 0.5 && currentCount > prevCount) {
        alert(`${org.name}s are rapidly increasing in number! Ensure that they don't overconsume their food sources.`);
    } else if (percentageChange > 0.5 && currentCount < prevCount) {
        alert(`${org.name}s are rapidly decreasing in number! It might be due to a lack of food or other external factors.`);
    }
}

function checkRandomEvent(ecosystem) {
    if (currentEvent && daysRemaining <= 0) {
        currentEvent.endEffect(ecosystem);
        currentEvent = null;
    }

    const eventChance = 0.01;

    if (!currentEvent && Math.random() < eventChance) {
        currentEvent = events[Math.floor(Math.random() * events.length)];
        daysRemaining = currentEvent.duration;
        currentEvent.effect(ecosystem);
        alert(currentEvent.message);
    }

    if (currentEvent) {
        daysRemaining--;
    }
}

let dayCount = 0;
let history = {
    Rabbit: [],
    Fox: [],
    Grass: [],
    Weed: []
};

let chart;

function simulateDay(ecosystem) {
    // Reset land usage every day
    landUsage = ecosystem.reduce((acc, org) => {
        if (org.name === "Grass" || org.name === "Weed") {
            acc += org.count;
        }
        return acc;
    }, 0);

    checkRandomEvent(ecosystem);

    // Store a copy of previous counts for checking significant changes
    const prevCounts = {};
    ecosystem.forEach(org => {
        prevCounts[org.name] = org.count;
    });

    let shuffledEcosystem = ecosystem.sort(() => Math.random() - 0.5);
    shuffledEcosystem.forEach(org => org.dailyRoutine(ecosystem));

    // Check for significant changes
    ['Fox', 'Rabbit'].forEach(animal => {
        const org = ecosystem.find(o => o.name === animal);
        checkSignificantChange(org, prevCounts[animal]);
    });
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
                label: 'Weed',
                borderColor: 'purple',
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
    chart.data.datasets[3].data.push(history.Weed[dayCount - 1]);
    chart.update();
}

function checkFoodChainBroken() {
    if (ecosystem.some(org => org.name === "Grass" && org.count <= 0)) {
        alert("The grass has gone extinct! Grass is a primary producer and forms the base of the food chain. Its extinction can lead to a collapse of the ecosystem, affecting all other organisms.");
        return true;
    }
    
    if (ecosystem.some(org => org.name === "Rabbit" && org.count <= 0)) {
        alert("Rabbits have gone extinct! As primary consumers, rabbits are crucial for controlling plant populations and serving as prey for predators. Their extinction will have cascading effects on the ecosystem.");
        return true;
    }
    
    if (ecosystem.every(org => (org.name !== "Grass" && org.name !== "Weed") && org.count <= 0)) {
        alert("All animals have died! Without animals, plants might overgrow without check, leading to potential ecological imbalances. The balance between flora and fauna is crucial for a stable ecosystem.");
        return true;
    }
    
    return false;
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
ecosystemIntroduction();
runSimulationDayByDay();
