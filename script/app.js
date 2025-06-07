const factDiv = document.getElementById('fact');
const btn = document.getElementById('newFactBtn');

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

// Busca o primeiro fato ao carregar a página
fetchCatFact();
