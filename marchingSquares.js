var resX = 100;
var resY = 100;

var width = Math.min(window.innerHeight, window.innerWidth) - 50;
var height = Math.min(window.innerHeight, window.innerWidth) - 50;

var offsetX = 25;
var offsetY = 25;

var noiseScale = 200;

var canvas = document.getElementById('cvs');
var body = document.getElementsByTagName("body");
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight-5;

noise.seed(Math.random());

var x=0;
var y=0;
var sx = width / resX / 2;
var sy = height / resY / 2;
for(var i=0;i<resX;i++)
{
    for(var j=0;j<resY;j++)
    {   
        x = i*height/resX + offsetX - sx/2;
        y = j*height/resY + offsetY - sy/2;
        var r = (noise.simplex2(x/noiseScale, y/noiseScale))*100;
        //ctx.fillStyle = "rgb(" + r + "," + r + "," + r + ")";
        //ctx.fillStyle = 'rgb(250, 0, 0)'
        if(r>0.5)
            ctx.fillRect(x, y, sx, sy);
    }    
}