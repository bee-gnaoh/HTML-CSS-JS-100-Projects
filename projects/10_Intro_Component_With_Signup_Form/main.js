const listInputWrapper = document.querySelectorAll('form .input-wrapper');
const listInput = document.querySelectorAll('form .input-wrapper input');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  clearError();
  listInput.forEach((el, index) => {
    const currentInputWrapper = listInputWrapper[index];
    if (el.value == '') {
      errorMess = `${el.alt} cannot be empty`;
      el.placeholder = '';
      if (el.name === 'email') {
        el.placeholder = 'email@example/com';
        errorMess = 'Looks like this is not an email';
      }
      currentInputWrapper.classList.add('error');
      currentInputWrapper.children[1].innerText = errorMess;
    }
  });
});

function clearError() {
  listInputWrapper.forEach(el => {
    el.classList.remove('error');
  });
}
