const views = {};

views.init = async function () {
  if (!views.projects || views.projects.length === 0) {
    await views.getProjects();
  }
};

views.projects = [];

views.getProjects = async function () {
  const projects = await fetch('public/js/data.json')
    .then(res => res.json())
    .catch(err => console.log(err));

  if (!projects) return;
  console.log(projects);
  views.projects = projects;
  views.renderProjects();
};

views.renderProjects = function () {
  const projects = document.querySelector('.projects');
  if (!views.projects) return;
  for (const item of views.projects) {
    projects.innerHTML += `
        <div>
            <img src="./projects${item.path}/${item.preview}">
            <div>
                <p>${item.title}</p>
                <a href="./projects${item.path}/index.html">Preview</a>
            </div>
        </div>
    `;
  }
};

window.onload = views.init;
