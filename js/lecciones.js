// Función para pronunciar texto en inglés usando la voz del navegador
function hablar(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Lógica del quiz
let respondidas = 0;
let correctas = 0;

function revisar(boton, opcionElegida) {
  const pregunta = boton.parentElement;

  // Si ya se respondió esta pregunta, no hacer nada
  if (pregunta.classList.contains('respondida')) return;

  const correcta = pregunta.dataset.correcta;
  const botones = pregunta.querySelectorAll('.opcion');

  botones.forEach((btn, index) => {
    const letra = ['a', 'b', 'c'][index];
    if (letra === correcta) {
      btn.classList.add('correcta');
    } else if (btn === boton) {
      btn.classList.add('incorrecta');
    }
    btn.disabled = true;
  });

  pregunta.classList.add('respondida');
  respondidas++;
  if (opcionElegida === correcta) correctas++;

  if (respondidas === document.querySelectorAll('.pregunta').length) {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  const total = document.querySelectorAll('.pregunta').length;
  const resultadoDiv = document.getElementById('resultado-quiz');
  resultadoDiv.textContent = `Obtuviste ${correctas} de ${total} respuestas correctas. ${correctas === total ? '¡Excelente trabajo! 🎉' : '¡Sigue practicando!'}`;
}