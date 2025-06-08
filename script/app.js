const factDiv = document.getElementById('fact');
const btn = document.getElementById('newFactBtn');
const speakBtn = document.getElementById('speakFactBtn');

async function translateToPortuguese(text) {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    return data[0][0][0];
  } catch (err) {
    console.error('Erro na tradução:', err);
    return text;
  }
}

async function fetchCatFact() {
  factDiv.textContent = 'Carregando...';
  try {
    const res = await fetch('https://catfact.ninja/fact');
    const data = await res.json();
    const translated = await translateToPortuguese(data.fact);
    factDiv.textContent = translated;
  } catch (err) {
    factDiv.textContent = 'Erro ao carregar fato.';
    console.error(err);
  }
}

btn.addEventListener('click', fetchCatFact);

// Lista de vozes disponíveis
let voices = [];
function setVoices() {
  voices = window.speechSynthesis.getVoices();
}

// Atualiza a lista de vozes quando disponível
window.speechSynthesis.onvoiceschanged = setVoices;
setVoices();

speakBtn.addEventListener('click', () => {
  const factText = factDiv.textContent;
  const utterance = new SpeechSynthesisUtterance(factText);

  // Define a voz mais natural em português, se disponível
  const portugueseVoices = voices.filter(voice => voice.lang.startsWith('pt'));
  if (portugueseVoices.length > 0) {
    // Tenta escolher a voz "Google português do Brasil", por exemplo
    const googleVoice = portugueseVoices.find(voice => voice.name.includes('Google'));
    utterance.voice = googleVoice || portugueseVoices[0];
  }

  // Ajusta a taxa e tom para parecer mais natural
  utterance.rate = 0.95; // velocidade
  utterance.pitch = 1;    // tom

  speechSynthesis.speak(utterance);
});

// Busca o primeiro fato ao carregar a página
fetchCatFact();
