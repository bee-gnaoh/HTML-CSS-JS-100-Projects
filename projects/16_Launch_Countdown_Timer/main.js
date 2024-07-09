const views = {};

views.init = () => {
  const secondsEl = document.querySelector('.second .flip-card');
  const minutesEl = document.querySelector('.minute .flip-card');
  const hoursEl = document.querySelector('.hours .flip-card');
  const daysEl = document.querySelector('.day .flip-card');

  updateTimer();
  const countdownInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const time = views.getTimes();
    views.renderCard(secondsEl, time.seconds);
    views.renderCard(minutesEl, time.minutes);
    views.renderCard(hoursEl, time.hours);
    views.renderCard(daysEl, time.days);
    if (time.diff <= 0) {
      clearInterval(countdownInterval);
    }
  }
};

views.countdown = Date.now() + 14 * 24 * 60 * 60 * 1000;

views.getTimes = function () {
  const now = Date.now();
  const diff = views.countdown - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return {
    diff,
    days,
    hours,
    minutes,
    seconds,
  };
};

views.renderCard = function (card, time) {
  const _t = pad(time);
  const tHalf = card.querySelector('.top-half');
  const bHalf = card.querySelector('.bottom-half');
  const tFlip = document.createElement('div');
  const bFlip = document.createElement('div');

  if (_t == tHalf.innerText) return;
  tFlip.classList.add('top-flip');
  tFlip.innerText = tHalf.innerText;

  bFlip.classList.add('bottom-flip');
  // bHalf.innerText = _t;

  tFlip.addEventListener('animationstart', () => {
    tHalf.innerText = _t;
  });
  tFlip.addEventListener('animationend', () => {
    tFlip.remove();
    bFlip.innerText = _t;
  });

  bFlip.addEventListener('animationend', () => {
    bHalf.innerText = _t;
    bFlip.remove();
  });

  card.appendChild(tFlip);
  card.appendChild(bFlip);
};

window.onload = views.init;

/**
 *
 * @param {number} num
 * @returns
 */
function pad(num) {
  if (num < 10) return `0${num}`;
  return num;
}
