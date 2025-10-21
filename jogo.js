
let comida = 5;
let agua = 5;
let energia = 10;
let dias = 0;


const textoHistoria = document.querySelector('.texto-historia');
const botoesDeJogo = document.querySelector('.botoesdejogo');
const statusComida = document.getElementById('status-comida');
const statusAgua = document.getElementById('status-agua');
const statusEnergia = document.getElementById('status-energia');
const statusDias = document.getElementById('status-dias');



function pescar() {
    let mensagem;
    let sucesso = Math.random() < 0.5; 
    energia -= 2;

    if (sucesso) {
        comida += 2;
        mensagem = "Você pescou um peixe! Brilhante, náufrago digital. (+2 Comida, -2 Energia)";
    } else {
        mensagem = "O peixe fugiu. Talvez o Wi-Fi estivesse fraco. (-2 Energia)";
    }
    return mensagem;
}

function descansar() {
    let mensagem;
    energia -= 1; 
    
    let sucesso = Math.random() < 0.5; 
    
    if(sucesso){
        energia += 3; 
        mensagem ="Você descansou à sombra de um coqueiro imaginário. (+4 Energia, -1 Custo)";
    } else {
        energia -= 2; 
        mensagem ="Você tentou descansar, mas choveu a noite toda. (-3 Energia Total)";
    }
    return mensagem;
}

function beber() {
    agua -= 1;
    energia += 1; 
    return "Água salgada? Não era uma boa ideia… (-1 Água, +1 Energia)";
}

function pedirAjuda() {
    let mensagem;
    let sucesso = Math.random() < 0.20; 

    if (sucesso) {
        mensagem = "Sinal de socorro enviado! Você foi encontrado e resgatado! FIM DE JOGO.";
    } else {
        energia -= 6;
        mensagem = "Ninguém te resgatou. (-6 Energia)";
    }
    return mensagem;
}


function atualizarStatusNaTabela() {
    statusComida.textContent = comida;
    statusAgua.textContent = agua;
    statusEnergia.textContent = energia;
    statusDias.textContent = dias;
}

function atualizarTela(mensagem) {
   
    atualizarStatusNaTabela(); 
    
 
    textoHistoria.textContent = `Dia ${dias}: ${mensagem}. O que você fará agora?`;
}

function verificarFimDeJogo() {
   
    if (comida <= 0 || agua <= 0 || energia <= 0) {
        
        atualizarStatusNaTabela();
        
        textoHistoria.textContent = "FIM DE JOGO! Suas reservas acabaram. Você não sobreviveu...";
        botoesDeJogo.style.display = 'none';
        return true;
    }
    
    
    if (dias >= 10) {
        textoHistoria.textContent = "PARABÉNS! Você sobreviveu aos 10 dias da simulação! Você venceu!";
        botoesDeJogo.style.display = 'none';
        return true;
    }
    
    return false;
}




function tomarAcao(acao) {
    let mensagem;

    
    if (verificarFimDeJogo()) return; 

   
    switch (acao) {
        case 'pedirajuda':
            mensagem = pedirAjuda();
            if (!mensagem.includes("resgatado")) {
                dias++; 
            }
            break;
            
        case 'pescar':
        case 'descansar':
        case 'beber':
            dias++; 
            
            if (acao === 'pescar') {
                mensagem = pescar();
            } else if (acao === 'descansar') {
                mensagem = descansar();
            } else {
                mensagem = beber();
            }
            break;
            
        default:
            mensagem = "Ação inválida.";
            break;
    }
    
    
   
    atualizarStatusNaTabela();
    
    
   
    if (mensagem.includes("resgatado")) {
        textoHistoria.textContent = mensagem; 
        botoesDeJogo.style.display = 'none'; 
        return; 
    }
    
    
    
    if (verificarFimDeJogo()) {
       
        return; 
    }
    
    
    atualizarTela(mensagem);
}




function iniciarJogo() {
   
    atualizarTela(mensagemInicial);
}


iniciarJogo();