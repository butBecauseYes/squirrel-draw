var sec = 0;
var classes = ["snowman", "octagon", "smiley_face", "matches", "animal_migration", "beard", "aircraft_carrier", "donut", "bottlecap", "mouth", "knee", "sink", "beach", "hurricane", "peas", "stitches", "ant", "grass", "angel", "line", "ear", "streetlight", "watermelon", "pear", "leg"];
var mood = "waiting";

console.log(classes.length);

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(950, 350);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {
    stroke(0);
    strokeWeight(3)
    if (mouseIsPressed) {
        line(mouseX - 5, mouseY - 5, pmouseX - 5, pmouseY - 5)
    }
}

function saveImg() {
    save("squirreldraw.png");
}

function hideSketches() {
    document.getElementById("modal").style.visibility = "hidden";
}

function showSketches() {
    document.getElementById("modal").style.visibility = "visible";
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("attempt").innerHTML = "I see " + results[0].label + ".";
        document.getElementById("sure").innerHTML = "I am " + Math.floor(results[0].confidence * 100) + "% sure.";
        utterThis = new SpeechSynthesisUtterance("I see " + results[0].label);
        if (results[0].label == want || results[1].label == want || results[2].label == want || results[3].label == want || results[4].label == want || results[5].label == want || results[6].label == want || results[7].label == want || results[8].label == want || results[9].label == want) {
            clearInterval(drawTimer);
            success();
        }
        synth.speak(utterThis);
    }
}

function ask() {
    num1 = Math.floor(Math.random() * 24);
    want = classes[num1];
    document.getElementById("request").innerHTML = "I want " + want + ".";
    document.getElementById("response").innerHTML = "I am " + mood;
    setTimer(20, "drawing");
    canvas.clear();
    background("white");
}

function tick_down1() {
    sec = sec - 1;
    document.getElementById("timer").innerHTML = sec + " seconds...";
    if (sec == 0) {
        clearInterval(drawTimer);
        failure();
    }
}

function setTimer(seconds, type) {
    sec = seconds;
    if (type == "drawing") {
        drawTimer = setInterval(tick_down1, 1000);
    }
}

function success() {
    if (mood == "depwesso espwesso ;-;") {
        mood = "sad .-.";
    } else if (mood == "sad .-.") {
        mood = "hungy?";
    } else if (mood == "hungy?") {
        mood = "waiting.";
    } else if (mood == "waiting.") {
        mood = "happy.";
    } else if (mood == "happy.") {
        mood = "overjoyed.";
    } else if (mood == "overjoyed.") {
        mood = "moosical.";
    } else if (mood == "moosical.") {
        mood = "squirrel-y.";
    }
    ask();
}

function giveUp() {
    clearInterval(drawTimer);
    failure();
}

function failure() {
    if (mood == "squirrel-y.") {
        mood = "moosical.";
    } else if (mood == "moosical.") {
        mood = "overjoyed.";
    } else if (mood == "overjoyed.") {
        mood = "happy.";
    } else if (mood == "happy.") {
        mood = "waiting.";
    } else if (mood == "waiting.") {
        mood = "hungy?";
    } else if (mood == "hungy?") {
        mood = "sad .-.";
    } else if (mood == "sad .-.") {
        mood = "depwesso espwesso ;-;";
    }
    ask();
}

ask();