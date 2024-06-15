const view = {};

view.init = async function () {
  const jsonData = await view.getData();
  view.setData(jsonData);
  view.renderCard();
  const navItems = document.querySelectorAll('ul li');
  for (const item of navItems) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      view.setTab(item.innerText.toLowerCase());
      view.setActiveTab();
      view.renderCard();
    });
  }
};

// data
view.data = null;
view.getData = function () {
  return fetch('./data.json')
    .then(res => res.json())
    .catch(err => console.log(err));
};
view.setData = function (data) {
  return (view.data = data);
};

// tab
view.tab = 'daily';
view.setTab = function (newTab) {
  return (view.tab = newTab);
};
view.setActiveTab = function () {
  const navItems = document.querySelectorAll('ul li');
  navItems.forEach(item => {
    const currentTab = view.tab;
    item.classList.remove('active');
    if (item.innerText.toLowerCase() === currentTab) item.classList.add('active');
  });
};

// render card
view.renderCard = function () {
  if (!view.data) return;
  const currentData = view.data;
  const mainEl = document.querySelector('main');
  mainEl.innerHTML = '';
  currentData.forEach(data => {
    let item = data.title.toLowerCase().replace(' ', '-');
    let content = data.timeframes[view.tab];
    mainEl.innerHTML += `
        <div class="card ${item}">
            <div class="card-media">
                <img src="./images/icon-${item}.svg" alt="icon-${item}">
            </div>
            <div class="card-main">
                <div class="card-header">
                    <p>${data.title}</p>
                    <div>
                        <span>
                            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="card-content">
                    <h1>${content.current}hrs</h1>
                    <p>Last Week - ${content.previous}hrs</p>
                </div>
            </div>
        </div>
        `;
  });
};

window.onload = view.init;
