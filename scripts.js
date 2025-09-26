// scripts.js — funcionalidades básicas do site de 1 ano de namoro

// Rolagem suave ao clicar em links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação simples de corações caindo
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 1000);

// CSS extra para corações (injetado pelo JS caso não esteja no CSS)
const style = document.createElement('style');
style.innerHTML = `
  .heart {
    position: fixed;
    top: -20px;
    font-size: 1.5rem;
    color: #ff6fae;
    pointer-events: none;
    animation-name: fall;
    animation-timing-function: linear;
  }

  @keyframes fall {
    to {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Feedback simples para formulário de mensagens
const form = document.querySelector('.msg-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! 💌');
        form.reset();
    });
}

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // altura do scroll que dispara a mudança
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Seleciona todos os itens da timeline
const timelineItems = document.querySelectorAll('.timeline-list li');

// Observer para animar ao entrar/ sair da tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // entra com animação
        } else {
            entry.target.classList.remove('visible'); // sai quando não está visível
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => observer.observe(item));

const music = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-btn");
music.autoplay = true;
music.loop = true;
music.load();
music.volume = 0.3
muteBtn.addEventListener("click", () => {
    if (music.muted) {
        music.muted = false;
        muteBtn.textContent = "🔊"; // ícone som
    } else {
        music.muted = true;
        muteBtn.textContent = "🔇"; // ícone mudo
    }
});
// Data de início do relacionamento
const startDate = new Date("2024-09-29T00:00:00"); // ajuste para a data correta

const timerElement = document.getElementById("timer");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate; // diferença em milissegundos

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Atualiza a cada segundo
setInterval(updateTimer, 1000);
updateTimer(); // executa imediatamente para não esperar 1s

const scrollContainer = document.querySelector('.gallery-scroll');
const items = Array.from(scrollContainer.children);

// duplicar todos os elementos
items.forEach(item => {
  scrollContainer.appendChild(item.cloneNode(true));
});

const particleContainer = document.getElementById('particle-container');

function createHeartParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  // posição inicial horizontal aleatória
  const xStart = Math.random() * 100; // vw
  const xEnd = xStart + (Math.random() * 10 - 5); // pequenas variações horizontais
  particle.style.setProperty('--x-start', xStart + 'vw');
  particle.style.setProperty('--x-end', xEnd + 'vw');

  // tamanho aleatório
  const scale = Math.random() * 0.7 + 0.5; // 0.5 a 1.2
  particle.style.setProperty('--scale', scale);

  // duração aleatória
  particle.style.animationDuration = Math.random() * 5 + 5 + 's';

  particleContainer.appendChild(particle);

  // remove ao final da animação
  setTimeout(() => {
    particle.remove();
  }, parseFloat(particle.style.animationDuration) * 700);
}

// cria partículas lentamente para efeito discreto
setInterval(createHeartParticle, 800);

const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
});

const sideMenu = document.getElementById("side-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  sideMenu.classList.toggle("open");
});


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shrink');
        sideMenu.classList.add('shrink'); // move o menu para cima
    } else {
        header.classList.remove('shrink');
        sideMenu.classList.remove('shrink'); // volta para a posição normal
    }
});