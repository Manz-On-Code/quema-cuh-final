leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
song1 = "";
song2 = "";
status_leftwrist=""
function preload()
{
 song1 = loadSound("music.mp3")
 song2 = loadSound("music2.mp3")
}
function setup()
{
    canvas = createCanvas(400,400)
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400,400)
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('Posenet Is Initialized');
}
function draw(){
    image(video,0,0,400,400)
    status_leftwrist = song1.isPlaying()
    fill("red")
    stroke("white")
    if(score_leftWrist > 0.2) {
    circle(leftWristX, leftWristY,20);
    song2.stop()
    if(status_leftwrist == false){
        song1.play()
        document.getElementById("status").innerHTML = "playing Pirate Music"
    }
    
    
}
}
function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("leftWristX = "+leftWristX+"leftWristY =" + leftWristY);
        console.log("rightWristX = "+rightWristX+"rightWristY =" + rightWristY);
        console.log("leftWrist score ="+score_leftWrist);
        console.log("rightWrist score ="+score_rightWrist);
    }
    }
