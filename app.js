let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){ //tag e texto são parametros
    let campo = document.querySelector(tag); //parametro 1
    campo.innerHTML = texto  //parametro 2
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // adiciona fala a cada frase
    if ('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.3;
        window.speechSynthesis.speak(utterance);
    }
        else{
            console.log('Web Speech API não suportada neste navegador.')
        }    
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial()



function verificarChute() {
  let chute = parseInt(document.querySelector("input").value);
  if (chute === numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou! =D');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'o número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'o número secreto é maior');
    }
    tentativas++;
    limparCampo()
  }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista === numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) { //includes é (metodo)função do JS, verifica se o dado já existe
        return gerarNumeroAleatorio();    
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //adiciona o dado ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reinciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}