img = "";
status = "";
objects = [];
song = "";

function preload() {
    song = loadSound("warning.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            if(objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Object Detected";
                document.getElementById("number_of_objects").innerHTML = "Baby Detected";
                song.stop();
            }

            else {
                document.getElementById("status").innerHTML = "Object Detected";
                document.getElementById("number_of_objects").innerHTML = "Baby not Detected";
                song.play();
            }

            if(objects.length < 0){
                document.getElementById("status").innerHTML = "";
                document.getElementById("number_of_objects").innerHTML = "Baby not Detected";
                song.play();
            }

            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}