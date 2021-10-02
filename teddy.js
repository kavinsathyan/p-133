img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('teddy.jpg');
}

function setup()
{
    canvas = createCanvas(640, 250);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}


function modelLoaded()
{
    console.log("model Loaded!");
    status= true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img,0,0,640,250)
    if(status != "")
    {
      for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "status : Objects Detected";

          fill("#800080");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
          noFill();
          stroke("#800080");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }  
    }


}