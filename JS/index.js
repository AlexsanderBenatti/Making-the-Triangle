var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
d1 = 0, d2 = 0, d3 = 0, arcA = 0, arcB = 0, arcC = 0, tetaA = 0, tetaB = 0, tetaC = 0
//d = tamanho de um dos lados, arc = ângulo entre os lados em radianos, teta = ângulo entre os lados em graus
xA = 0, xB = 0, xC = 0, yA = 0, yB = 0, yC = 0
//coordenadas dos vértices (sendo eles denominados como mostrado na foto que eu mandei)
const btnSubmit = document.querySelector('#submitBtn')
btnSubmit.addEventListener("click", function(e) { //ações para fazer na hora que clicar
    e.preventDefault(); //Faz com que a página não atualize quando aperte o botão
    const d1Index = document.querySelector('#Numd1'); //pegando o valor dos lados
    const d2Index = document.querySelector('#Numd2');
    const d3Index = document.querySelector('#Numd3');
    d1 = d1Index.value * 50; //armazenando os valores e multiplicando por 50 pra ficar melhor na figura
    d2 = d2Index.value * 50;
    d3 = d3Index.value * 50;
    if (d1 + d2 <= d3 || d1 + d3 <= d2 || d2 + d3 <= d1) {
        document.getElementById("aviso").style.display = 'inline';
        return
    } else {
        document.getElementById("aviso").style.display = 'none';
    }
    arcA = Math.acos((d1**2 + d3**2 - d2**2)/(2*d1*d3)); //Lei dos cossenos
    arcB = Math.acos((d1**2 + d2**2 - d3**2)/(2*d1*d2));
    arcC =  Math.acos((d2**2 + d3**2 - d1**2)/(2*d2*d3));
    tetaA = (arcA*180)/Math.PI; tetaB = (arcB*180)/Math.PI; tetaC = (arcC*180)/Math.PI //conversão para graus
    xA = 0, xB = d1*Math.cos(arcA), xC = (d1*Math.sin(arcB))/Math.sin(arcC), //Coordenadas por meio dos valores
    yA = d1*Math.sin(arcA), yB = 0, yC = d1*Math.sin(arcA) //Detalhe: o xA e o yB são sempre 0 (para facilitar os cálculos)
    if (xB < xA) {
        xA = -xB
        xB = 0
        yA = d1*Math.sin(arcB)
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.clearRect(0,0,c.width,c.height) //Comando pra limpar o canvas
    ctx.moveTo(xA,yA) //vértice A
    ctx.lineTo(xB,yB) //vértice B
    ctx.lineTo(xC,yC) //vértice C
    ctx.closePath() //linha para o vértice B
    ctx.fill()
    ctx.stroke(); 
    console.log(area(d1/50,d2/50,d3/50) + "m²") //printando a área
    console.log("D1: " +d1 + " D2: " +d2 + " D3: " +d3)
})
function area(a, b, c) {
    //Área (Fórmula de Herão)
    var s = (a+b+c)/2;
    return Math.round(Math.sqrt(s*(s-a)*(s-b)*(s-c))*100)/100;
}
