/*
  Declaração de uso de IA:
  Usei IA (Claude) como tutor: para tirar dúvidas, ver exemplos e entender erros.
  Eu li o código e preciso conseguir explicar cada parte na defesa.
  (Marcelo: se você mudar o código ou não usou IA em alguma parte, atualize este comentário com a verdade.)
*/

// Pegando os elementos da página que vou usar
const botaoMenu = document.getElementById("botaoMenu");
const menuPrincipal = document.getElementById("menuPrincipal");
const botaoTema = document.getElementById("botaoTema");
const textoSaudacao = document.getElementById("saudacao");
const anoAtual = document.getElementById("anoAtual");
const voltarTopo = document.getElementById("voltarTopo");
const formulario = document.getElementById("formContato");

// Recebe a hora e devolve a saudação certa
function obterSaudacao(hora) {
  if (hora < 12) {
    return "Bom dia";
  } else if (hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

// Mostra a saudação no hero usando a hora do computador
function mostrarSaudacao() {
  const horaAtual = new Date().getHours();
  textoSaudacao.textContent = obterSaudacao(horaAtual) + "! 👋";
}

// Abre e fecha o menu no celular e atualiza o aria-expanded
function alternarMenu() {
  const estaAberto = menuPrincipal.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", estaAberto);
  botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
}

// Troca entre modo claro e escuro e guarda a escolha no localStorage
function alternarTema() {
  const ficouEscuro = document.body.classList.toggle("modo-escuro");
  botaoTema.textContent = ficouEscuro ? "☀️" : "🌙";
  localStorage.setItem("temaEscolhido", ficouEscuro ? "escuro" : "claro");
}

// Quando a página abre, vê se o tema escuro foi escolhido antes
function carregarTemaSalvo() {
  if (localStorage.getItem("temaEscolhido") === "escuro") {
    document.body.classList.add("modo-escuro");
    botaoTema.textContent = "☀️";
  }
}

// Coloca o ano atual no rodapé
function mostrarAno() {
  anoAtual.textContent = new Date().getFullYear();
}

// Escreve uma mensagem de erro embaixo de um campo
function mostrarErro(idErro, texto) {
  document.getElementById(idErro).textContent = texto;
}

// Apaga todas as mensagens de erro e de sucesso
function limparMensagens() {
  const erros = document.querySelectorAll(".erro");
  erros.forEach(function (erro) {
    erro.textContent = "";
  });
  document.getElementById("mensagemSucesso").textContent = "";
}

// Confere o formulário. Retorna true se está tudo certo e false se tem erro
function validarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;
  let tudoCerto = true;

  limparMensagens();

  if (nome === "") {
    mostrarErro("erroNome", "Preencha o seu nome.");
    tudoCerto = false;
  }

  if (email === "") {
    mostrarErro("erroEmail", "Preencha o seu e-mail.");
    tudoCerto = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    mostrarErro("erroEmail", "O e-mail precisa ter @ e ponto. Exemplo: nome@email.com");
    tudoCerto = false;
  }

  if (mensagem === "") {
    mostrarErro("erroMensagem", "Escreva uma mensagem.");
    tudoCerto = false;
  } else if (mensagem.length < 20) {
    mostrarErro("erroMensagem", "A mensagem precisa ter pelo menos 20 caracteres.");
    tudoCerto = false;
  }

  if (!consentimento) {
    mostrarErro("erroConsentimento", "Marque a caixa para concordar com o uso dos dados.");
    tudoCerto = false;
  }

  return tudoCerto;
}

// Roda quando clicam em enviar
function enviarFormulario(evento) {
  evento.preventDefault(); // não deixa a página recarregar

  if (validarFormulario()) {
    document.getElementById("mensagemSucesso").textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
    formulario.reset();
  }
}

// BÔNUS: filtra os cards de projetos pela tecnologia
function filtrarProjetos(evento) {
  const botaoClicado = evento.target;
  if (!botaoClicado.classList.contains("filtro")) {
    return; // clicou em outra coisa, ignora
  }

  const tecnologiaEscolhida = botaoClicado.dataset.filtro;

  // marca só o botão clicado como ativo
  document.querySelectorAll(".filtro").forEach(function (botao) {
    botao.classList.remove("ativo");
  });
  botaoClicado.classList.add("ativo");

  // mostra ou esconde cada card
  document.querySelectorAll(".card").forEach(function (card) {
    const combina = tecnologiaEscolhida === "todos" || card.dataset.tecnologia === tecnologiaEscolhida;
    card.classList.toggle("escondido", !combina);
  });
}

// BÔNUS: o link "voltar ao topo" só aparece depois de rolar a página
function controlarVoltarTopo() {
  voltarTopo.hidden = window.scrollY < 300;
}

// Ligando cada evento à sua função
botaoMenu.addEventListener("click", alternarMenu);
botaoTema.addEventListener("click", alternarTema);
formulario.addEventListener("submit", enviarFormulario);
document.querySelector(".filtros").addEventListener("click", filtrarProjetos);
window.addEventListener("scroll", controlarVoltarTopo);

// Fecha o menu depois de clicar num link (no celular)
menuPrincipal.addEventListener("click", function (evento) {
  if (evento.target.tagName === "A" && menuPrincipal.classList.contains("aberto")) {
    alternarMenu();
  }
});

// Coisas que rodam assim que a página carrega
carregarTemaSalvo();
mostrarSaudacao();
mostrarAno();
controlarVoltarTopo();