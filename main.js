status = "";
objects = [];
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado : Detección de objetos";
}
function preload()
{
    img = loadImage('frutas.jpg');
}
function draw()
{
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        for ( i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Estado : objeto detectado";
        document.getElementById("numero_De_objetos").innerHTML = "El numero de objetos detectados son: "+ objects.length;
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    //fill("#FF0000");
    //text("Perro", 45, 75);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 60, 450, 350);

    //fill("#0000FF");
    //text("Gato", 315, 100);
    //noFill();
    //stroke("#0000FF");
    //rect(304, 85, 450, 350);
}
function modelLoaded()
{
    console.log("¡Modelo Cargado!");
    status = true;
    objectDetector.detect(video, gotResults);
}
function gotResults(error, results)
{
   if (error) {
    console.log(error);
   }
   console.log(results);
   objects = results;
}