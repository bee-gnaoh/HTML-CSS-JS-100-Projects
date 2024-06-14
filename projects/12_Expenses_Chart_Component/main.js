window.onload = init;

async function init() {
  const dataJson = await fetch('./data.json').then(res => res.json());
  console.log(dataJson);
  const chart = document.querySelector('.chart');

  const highlight = dataJson.reduce((acc, value) => (acc < value.amount ? value.amount : acc), 0);

  dataJson.forEach(data => {
    const chartItem = document.createElement('div');
    const chartItemValue = document.createElement('div');
    const chartValuePercent = document.createElement('div');
    const chartItemLabel = document.createElement('p');
    chartItemLabel.classList.add('chart-item-label');
    chartItem.classList.add('chart-item');
    chartItemValue.classList.add('chart-item-value');
    if (data.amount === highlight) chartItem.classList.add('highlight');
    chartItemLabel.innerText = data.day;
    chartValuePercent.style.height = `calc(${data.amount} * 3px)`;

    chartItemValue.appendChild(chartValuePercent);
    chartItem.appendChild(chartItemValue);
    chartItem.appendChild(chartItemLabel);
    chart.appendChild(chartItem);
  });
}
