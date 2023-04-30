window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;


let i = 0
const recognition = new SpeechRecognition();
recognition.lang = "pt"
recognition.start()

recognition.addEventListener('result', onSpeak) //Obrigatóriamente tem que ser "Result", deve ser uma palavra reservada como o "click"

const dica = document.querySelector(".dica")

function onSpeak(event) {
    const chute = event.results[0][0].transcript
    i = i + 1
    chuteValido(chute)
    resultadoCerto(chute)
    console.log(chute);
    desistir(i)
    gameOver(chute, i)
}

function chuteValido(chute) {
    const erro = document.querySelector(".erro")
    const incorreto = document.querySelector(".incorreto")
    const num = +chute
    if(!parseInt(chute)){
        erro.classList.add("aparecer")
        incorreto.classList.remove("aparecer")
    }else if(num < menorValor || num > maiorValor){
        incorreto.classList.add("aparecer")
        erro.classList.remove("aparecer")
    }else{
        exibirResultado(chute)
        erro.classList.remove("aparecer")
        incorreto.classList.remove("aparecer")
    }
    return
}

function exibirResultado(chute) {
    const valor = document.querySelector(".box")
    valor.innerHTML = chute
}

function resultadoCerto(chute) {
    if(parseInt(chute) === numSecreto){
        document.body.innerHTML = `
            <h2>PARABENS!! Você acertou!!</h2>
            <h3>O número secreto era ${numSecreto}!</h3>
            <button id="jogarNovamente" class="btn-jogar">Jogar Novamente</button>
        `
    }else if(chute > numSecreto) {
        dica.innerHTML = `
        <p>O número secreto é menor <i class="fa-regular fa-hand-point-down"></i></p>
        `
    }else{
        dica.innerHTML = `
        <p>O número secreto é maior <i class="fa-regular fa-hand-point-up"></i></p>
        `
    }
}
function desistir(i) {
    const over = document.querySelector(".desistir")
    if (i > 7) {
        over.innerHTML = `
        <p class="over">Você pode falar "desisto" para desistir do jogo</p>
        `
    }
}

function gameOver(chute, i) {
    if (chute == "chega" || chute == "desisto") {
        document.body.classList.add("gameOver")
        document.body.innerHTML = `
            <h2>INACREDITÁVEL!! Você Desistiu?!</h2>
            <h3>Você é um perdedor! Nunca deveria desistir</h3>
            <p class="numOver">O número secreto era ${numSecreto}!</p>
            <p>Que vergonha! Estou sem palavras!</p>
            <p>Não sei se vai adiantar, mas... você pode tentar jogar novamente</p>
            <button id="jogarNovamente" class="btn-over">Jogar Novamente</button>
        `    
    }else if(i > 15){
        document.body.classList.add("gameOver")
        document.body.innerHTML = `
            <h2>VOCÊ PERDEU!!</h2>
            <h3>Você teve mais de 15 tentativas e falhou.</h3>
            <p class="numOver">O número secreto era ${numSecreto}!</p>
            <p>Você pode tentar jogar novamente</p>
            <button id="jogarNovamente" class="btn-over">Jogar Novamente</button>
        `  
    }
    
}

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', e => {
    if(e.target.id === "jogarNovamente"){
        window.location.reload()
    }
})

