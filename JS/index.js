var c=document.getElementById("canvasCircle");
var ctx=c.getContext("2d");
d1 = 0, d2 = 0, d3 = 0, arcA = 0, arcB = 0, arcC = 0, tetaA = 0, tetaB = 0, tetaC = 0
xA = 0, xB = 0, xC = 0, yA = 0, yB = 0, yC = 0
const btnSubmit = document.querySelector('#submitBtn')
btnSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const d1Index = document.querySelector('#Numd1');
    const d2Index = document.querySelector('#Numd2');
    const d3Index = document.querySelector('#Numd3');
    d1 = d1Index.value;
    d2 = d2Index.value;
    d3 = d3Index.value;
    arcA = Math.acos((d1**2 + d3**2 - d2**2)/(2*d1*d3));
    arcB = Math.acos((d1**2 + d2**2 - d3**2)/(2*d1*d2));
    arcC =  Math.acos((d2**2 + d3**2 - d1**2)/(2*d2*d3));
    tetaA = (arcA*180)/Math.PI; tetaB = (arcB*180)/Math.PI; tetaC = (arcC*180)/Math.PI
    xA = 0, xB = d1*Math.cos(arcA), xC = (d1*Math.sin(arcB))/Math.sin(arcC),
    yA = d1*Math.sin(arcA), yB = 0, yC = d1*Math.sin(arcA)
    ctx.lineWidth = 2;
    ctx.clearRect(0,0,750,750)
    ctx.moveTo(xB,yB) //B
    ctx.lineTo(xA,yA) //A
    ctx.lineTo(xC,yC) //C
    ctx.closePath()
    ctx.stroke();
})
function area(a, b, c) {
    //Área (Fórmula de Herão)
    var s = (a+b+c)/2;
    return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}
let triangleArea = area(d1, d2, d3);
console.log("Área: " + triangleArea);
/*
console.log(angleTetaA);
console.log(Math.round(angleTetaB * 100) / 100);
console.log(Math.round(angleTetaC * 100) / 100);
*/ 