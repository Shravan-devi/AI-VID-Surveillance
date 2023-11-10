video = "";
statuss="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(statuss != ""){
        object_detector.detect(video, gotResults);
        document.getElementById("status").innerHTML="Status:Objects Detected";
        document.getElementById("no_objects").innerHTML="Number of objects detected: " + objects.length;
        for(var i=0; i<objects.length; i++){
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function start(){
    object_detector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Objects Detecting";
}

function modelLoaded(){
    statuss=true;
    console.log("model is loaded");
    video.loop();
    video.speed(1);
    video.volume(0);
}