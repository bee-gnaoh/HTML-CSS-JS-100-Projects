window.onload = init;

async function init() {
  const data = await fetch('public/js/data.json')
    .then(res => res.json())
    .catch(err => console.log(err));

  if (!data) return;
  const projects = document.querySelector('.projects');
  data.forEach(item => {
    projects.innerHTML += `
        <div>
            <img src="./projects${item.path}/${item.preview}">
            <div>
                <p>${item.title}</p>
                <a href="./projects${item.path}/index.html">Preview</a>
            </div>
        </div>
    `;
  });
}
