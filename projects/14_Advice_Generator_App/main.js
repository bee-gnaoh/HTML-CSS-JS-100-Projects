const views = {};

const url = 'https://api.adviceslip.com/advice';

views.init = async function () {
  console.log(1);
  if (!views.adviceId || views.quote) {
    await views.getQuote();
  }

  const dice = document.querySelector('.card .card-action button');
  dice.addEventListener('click', async event => {
    event.preventDefault();
    await views.getQuote();
  });
};

views.adviceId = '';
views.quote = '';
views.getQuote = async function () {
  const newQuote = await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));
  if (!newQuote) return;
  const { id, advice } = newQuote.slip;
  views.adviceId = id;
  views.quote = advice;

  views.renderQuote();
};

views.renderQuote = function () {
  const adviceEl = document.querySelector('.card .card-header p');
  const quoteEl = document.querySelector('.card .card-content p ');
  if (!views.adviceId || !views.quote) return;
  adviceEl.innerText = `ADVICE #${views.adviceId}`;
  quoteEl.innerHTML = `<q>${views.quote}</q>`;
};

window.onload = views.init;
