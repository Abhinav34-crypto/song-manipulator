var song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;

function setup(){
    canvas=createCanvas(600 , 600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
  if(results.length>0)
  {
      console.log(results);
      leftWristX= results[0].pose.leftWrist.x;
      leftWristY= results[0].pose.leftWrist.y;
      rightWristX= results[0].pose.rightWrist.x;
      rightWristY= results[0].pose.rightWrist.y;
      console.log(leftWristX , leftWristY , rightWristX , rightWristY);
      console.log("leftWristX = " + leftWristX +" leftWristY = " + leftWristY);
      console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY);
      leftWristScore=results[0].pose.keypoints[9].score;
      rightWristScore=results[0].pose.keypoints[10].score;
      console.log(leftWristScore , rightWristScore);
  }
}

function draw(){
    image(video , 0 , 0 , 600 , 600);
    
    fill("#00FF00");
    stroke("#00FF00");
    
    if(rightWristScore>0.1){
        circle(rightWristX , rightWristY , 20);
        if(rightWristY > 0 && rightWristY<=120){
            document.getElementById("speed").innerHTML= "Speed = 0.5x";
            song.rate(0.5);
        }else if(rightWristY > 120 && rightWristY<=240){
            document.getElementById("speed").innerHTML= "Speed = 1x";
            song.rate(1);
        }else if(rightWristY > 240 && rightWristY<=360){
            document.getElementById("speed").innerHTML= "Speed = 1.5x";
            song.rate(1.5);
        }else if(rightWristY > 360 && rightWristY<=480){
            document.getElementById("speed").innerHTML= "Speed = 2x";
            song.rate(2);
        }else if(rightWristY > 480 && rightWristY<=600){
            document.getElementById("speed").innerHTML= "Speed = 2.5x";
            song.rate(2.5);
        }
    
    }
    
    if(leftWristScore> 0.1){
    circle(leftWristX , leftWristY , 20);
    InNumberleftY = Number(leftWristY);
    remove_decimals= floor(InNumberleftY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function preload(){
   song=loadSound("music.mp3");
}

function play(){
    song.play(); 
    song.setVolume(1);
    song.rate(1);
}
