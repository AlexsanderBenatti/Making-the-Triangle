var c=document.getElementById("canvas"); var c2=document.getElementById("canvas2"); //Pegando o canvas
var ctx=c.getContext("2d"); var ctx2=c2.getContext("2d");
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
    d1 = (d1Index.value / d1Index.value) * 50; //armazenando os valores e mudando a proporção pra ficar melhor na figura
    d2 = (d2Index.value / d1Index.value) * 50;
    d3 = (d3Index.value / d1Index.value) * 50;
    if (d1 + d2 <= d3 || d1 + d3 <= d2 || d2 + d3 <= d1) { //Problema da desigualdade 
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
    yA = d1*Math.sin(arcA), yB = 0, yC = d1*Math.sin(arcA) //Detalhe: o xA e o yB são sempre 0 (com exceção do caso na linha 28)
    if (xB < xA) { //Caso em que o ângulo de A era obtuso
       xA = d3*Math.cos(arcC); yA = 0
       xC = 0; yC = d3*Math.sin(arcC)
       xB = (d3*Math.sin(arcA))/Math.sin(arcB); yB = yC //Mudando apenas o modo de representação do triângulo
    }
    draw(xA,xB,xC,yA,yB,yC)
    console.log(area((d1*d1)/(d1*50),(d2*d1)/(d1*50),(d3*d1)/(d1*50)) + "m²") //printando a área
})

const btnSubmit2 = document.querySelector('#submit2Btn')
btnSubmit2.addEventListener('click', function(e) {
    e.preventDefault()
    const tetaAIndex = document.querySelector('#NumtetaA')
    const tetaBIndex = document.querySelector('#NumtetaB')
    const tetaCIndex = document.querySelector('#NumtetaC')
    tetaA = parseFloat(tetaAIndex.value)
    tetaB = parseFloat(tetaBIndex.value)
    tetaC = parseFloat(tetaCIndex.value)
    console.log(tetaA + tetaB + tetaC)
    if (tetaA + tetaB + tetaC != 180) { //Soma dos ângulos internos tem que dar 180°
        document.getElementById("aviso2").style.display = 'inline';
        return
    } else {
        document.getElementById("aviso2").style.display = 'none';
    }
    arcA = (tetaA*Math.PI)/180; arcB = (tetaB*Math.PI)/180; arcC = (tetaC*Math.PI)/180
    d1 = 75 //Valor para representação do triângulo (quanto maior, maior a imagem no canvas)
    d2 = (d1*Math.sin(arcA))/Math.sin(arcC) //Lei dos senos
    d3 = (d1*Math.sin(arcB))/Math.sin(arcC)
    xA = 0, xB = d1*Math.cos(arcA), xC = (d1*Math.sin(arcB))/Math.sin(arcC), //Coordenadas por meio dos valores
    yA = d1*Math.sin(arcA), yB = 0, yC = d1*Math.sin(arcA) //Detalhe: o xA e o yB são sempre 0 (para facilitar os cálculos)
    if (xB < xA) { //Caso do ânguloA ser obtuso
        xA = d3*Math.cos(arcC); yA = 0
        xC = 0; yC = d3*Math.sin(arcC)
        xB = (d3*Math.sin(arcA))/Math.sin(arcB); yB = yC
    }
    draw2(xA,xB,xC,yA,yB,yC)
    console.log(area((d1*d1)/(d1*75),(d2*d1)/(d1*75),(d3*d1)/(d1*75)) + "m² (Detalhe: área com d1 valendo 1)") //printando a área
})

function draw(xA,xB,xC,yA,yB,yC) { //Desenhar no canvas 1
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.clearRect(0,0,c.width,c.height) //Comando pra limpar o canvas
    ctx.moveTo(xA,yA) //vértice A
    ctx.lineTo(xB,yB) //vértice B
    ctx.lineTo(xC,yC) //vértice C
    ctx.closePath() //linha para o vértice B
    ctx.fill() 
} 
function draw2(xA,xB,xC,yA,yB,yC) { //Desenhar no canvas 2
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.clearRect(0,0,c.width,c.height) //Comando pra limpar o canvas
    ctx2.moveTo(xA,yA) //vértice A
    ctx2.lineTo(xB,yB) //vértice B
    ctx2.lineTo(xC,yC) //vértice C
    ctx2.closePath() //linha para o vértice B
    ctx2.fill() 
}

function area(a, b, c) {
    //Área (Fórmula de Herão)
    var s = (a+b+c)/2;
    return Math.round(Math.sqrt(s*(s-a)*(s-b)*(s-c))*100)/100;
}
