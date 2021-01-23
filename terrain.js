var width = 1000;
var height = 1000;

var borderMargin = {
    x: 10,
    y: 10
};

const ctx = document.getElementById("cvs").getContext("2d");



function sizeCanvas() {
    const canvas = document.getElementById("cvs");
    width = window.innerWidth - 2*(borderMargin.x);
    height = window.innerHeight - 2*(borderMargin.y);
    canvas.width = width;
    canvas.height = height;
}


function generateTerrain(array, colonnes, lignes)
{
    for(var i=0; i<lignes; i++)
    {
        for(var j=0; j<colonnes; j++)
        {
            //var tmp = noise.perlin2(j/10, i/10);
            var tmp = (perlin.get(j/10, i/10)+1) / 2
            var toVal;
            if(tmp<treshold)
            {
                toVal = true;
            }
            else
            {
                toVal = false;
            }
            array.push({
                x: parseFloat(j)*tileX,
                y: parseFloat(i)*tileY,
                val: toVal
            });
        }
    }
}

function listEq(l1, l2)
{
    if(l1.length!=l2.length)
    {
        return false
    }
    for(var i in l1)
    {
        if(l1[i]!=l2[i])
        {
            return false
        }
    }
    return true
}

function marchingSquares(pts)
{
    var i;
    for(var p in pts)
    {
        i=parseFloat(p);
        if((i+1)%columns==0)
        {
            continue;
        }
        if(i>=(pts.length-columns))
        {
            continue;
        }
        else
        {
            var topLeft = pts[i];
            var topRight = pts[i+1];
            var bottomLeft = pts[i+columns]
            var bottomRight = pts[i+columns+1]

            /*
            console.log(topLeft);
            console.log(topRight);
            console.log(bottomLeft);
            console.log(bottomRight);
            */

            var mx = (topLeft.x + topRight.x + bottomLeft.x + bottomRight.x) / 4;
            var my = (topLeft.y + topRight.y + bottomLeft.y + bottomRight.y) / 4;

            var ptsList = [];

            ptsList.push(topLeft.val);
            ptsList.push(topRight.val);
            ptsList.push(bottomLeft.val);
            ptsList.push(bottomRight.val);

            //console.log(ptsList);
            var segments=[];
            if(listEq(ptsList,[false, false, false, false])) {segments=[]}
            if(listEq(ptsList,[false, false, false, true])) {segments=[1, 0.5, 0.5, 1, 1, 1]}
            if(listEq(ptsList,[false, false, true, false])) {segments=[0, 0.5, 0.5, 1, 0, 1]}
            if(listEq(ptsList,[false, false, true, true])) {segments=[0, 1, 0, 0.5, 1, 0.5, 0, 1, 1, 0.5, 1, 1]}
            if(listEq(ptsList,[false, true, false, false])) {segments=[0.5, 0, 1, 0.5, 1, 0]}
            if(listEq(ptsList,[false, true, false, true])) {segments=[0.5, 0, 1, 0, 0.5, 1, 1, 0, 0.5, 1, 1, 1]}
            if(listEq(ptsList,[false, true, true, false])) {segments=[1, 0, 0.5, 0, 0, 0.5, 1, 0, 0, 0.5, 0, 1, 1, 0, 0, 1, 0.5, 1, 1, 0, 0.5, 1, 1, 0.5]}
            if(listEq(ptsList,[false, true, true, true])) {segments=[0.5, 0, 1, 0, 1, 1, 0.5, 0, 0, 0.5, 1, 1, 0, 0.5, 0, 1, 1, 1]}
            if(listEq(ptsList,[true, false, false, false])) {segments=[0, 0, 0, 0.5, 0.5, 0]}
            if(listEq(ptsList,[true, false, false, true])) {segments=[0, 0, 0, 0.5, 0.5, 1, 0, 0, 0.5, 1, 1, 1, 0, 0, 1, 1, 1, 0.5, 0, 0, 0.5, 0, 1, 0.5]}
            if(listEq(ptsList,[true, false, true, false])) {segments=[0, 0, 0.5, 0, 0, 1, 0.5, 0, 0, 1, 0.5, 1]}
            if(listEq(ptsList,[true, false, true, true])) {segments=[0, 0, 0.5, 0, 0, 1, 0.5, 0, 1, 0.5, 0, 1, 1, 0.5, 1, 1, 0, 1]}
            if(listEq(ptsList,[true, true, false, false])) {segments=[0, 0, 1, 0, 0, 0.5, 0, 0.5, 1, 0, 1, 0.5]}
            if(listEq(ptsList,[true, true, false, true])) {segments=[0, 0, 0, 0.5, 1, 0, 0, 0.5, 1, 0, 0.5, 1, 1, 0, 0.5, 1, 1, 1]}
            if(listEq(ptsList,[true, true, true, false])) {segments=[0, 0, 1, 0, 1, 0.5, 0, 0, 1, 0.5, 0.5, 1, 0, 0, 0.5, 1, 0, 1]}
            if(listEq(ptsList,[true, true, true, true])) {segments=[0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1]}

            //console.log(segments);
            for(var j=0; j<segments.length/6; j++)
            {
                //console.log("HIT THE ROAD JAAAAAAAAAAAAAAAAAAAAAACK")
                ctx.lineWidth = 0;
                ctx.beginPath();
                ctx.moveTo(segments[j*6]*tileX+topLeft.x, segments[j*6+1]*tileY+topLeft.y);
                ctx.lineTo(segments[j*6+2]*tileX+topLeft.x, segments[j*6+3]*tileY+topLeft.y);
                ctx.lineTo(segments[j*6+4]*tileX+topLeft.x, segments[j*6+5]*tileY+topLeft.y);
                ctx.fill();
                ctx.closePath();
                //ctx.stroke();
            }

            if(DEBUG)
            {
                ctx.fillStyle = "#DC143C";
                ctx.fillRect(mx, my, 5, 5);
                ctx.fillStyle = "#000000";
            }
        }
    }
}

function drawPoints(pts)
{
    for(var p in points)
    {
        if(points[p].val)
        {
            ctx.fillRect(pts[p].x, pts[p].y, 5, 5);
        }
    }

}

function mainLoop()
{
    //drawPoints(points);
    ctx.clearRect(0, 0, width, height);
    marchingSquares(points);

    window.requestAnimationFrame(mainLoop);
}

var points = [];

var columns = 100;
var lines = 50;

var tileX = 15;
var tileY = 15;

var DEBUG = false;

const treshold = 0.5;

var seed = Math.random();
console.log(seed);
//noise.seed(seed);
//noise.seed(0.39176392359703494);

window.onload = () => {
    window.addEventListener("resize", sizeCanvas, false);
    sizeCanvas();

    generateTerrain(points, columns, lines);
    drawPoints(points);
    marchingSquares(points);

    window.requestAnimationFrame(mainLoop);
};