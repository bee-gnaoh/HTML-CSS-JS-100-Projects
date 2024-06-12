const inputWrappers = document.querySelectorAll('.input-wrapper');
const resultYear = document.getElementById('resultYear');
const resultMonth = document.getElementById('resultMonth');
const resultDay = document.getElementById('resultDay');

const submit = document.getElementById('submitBtn');

submit.addEventListener('click', event => {
  event.preventDefault();
  let date = {};
  inputWrappers.forEach(ele => {
    const input = ele.querySelector('input');
    const errMessage = ele.querySelector('p');
    if (input.value === '') {
      ele.classList.add('error');
      errMessage.innerText = 'This field is required';
    } else {
      if (input.name === 'day' && !(input.value >= 1 && input.value <= 31)) {
        ele.classList.add('error');
        errMessage.innerText = 'Must be a valid day';
      } else if (input.name === 'month' && !(input.value >= 1 && input.value <= 12)) {
        ele.classList.add('error');
        errMessage.innerText = 'Must be a valid month';
      } else if (input.name === 'year' && new Date().getFullYear() < input.value) {
        ele.classList.add('error');
        errMessage.innerText = 'Must be in the pass';
      } else {
        ele.classList.remove('error');
        errMessage.innerText = '';
        date[input.name] = input.value;
      }
    }
  });

  let validDate = new Date(`${date.year}-${date.month}-${date.day}`);
  if (isNaN(validDate)) {
    resultYear.innerText = '--';
    resultMonth.innerText = '--';
    resultDay.innerText = '--';
  } else {
    let result = calcDate(validDate);
    resultYear.innerText = result.years;
    resultMonth.innerText = result.months;
    resultDay.innerText = result.days;
  }
});

function calcDate(date) {
  const today = new Date();
  date = new Date(date);

  let years = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();
  let days = today.getDate() + 1 - date.getDate();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const previousMonth = (today.getMonth() - 1 + 12) % 12;
    const daysInPreviousMonth = new Date(today.getFullYear(), previousMonth + 1, 0).getDate();
    days += daysInPreviousMonth;
  }
  if (years < 0) years = 0;

  return { years, months, days };
}
