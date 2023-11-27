song = "";
status = "";
objects = [];
function preload() {
    song = loadSound("alert.wav");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else{
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
        objectDetector.detect(video, gotResults);
        if (objects.length > 0) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            for (i = 0; i < objects.length; i++) {
                if(objects[i].label == "person"){
                    document.getElementById("baby").innerHTML = "Baby Found";
                    song.stop();
                    fill(r, g, b);
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke(r, g, b);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                }
                else{
                    document.getElementById("baby").innerHTML = "Baby not found";
                    song.stop();
                }
            }
        }
        else{
            document.getElementById("baby").innerHTML = "Baby not found";
            song.play();
        }
    }
}