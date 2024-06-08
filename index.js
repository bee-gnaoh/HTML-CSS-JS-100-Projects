const projects = document.querySelector('.projects')

window.onload = async () => {
    console.log(data);
    data.forEach(item => {
        projects.innerHTML += `
            <div>
                <img src="${item.path}/${item.preview}">
                <div>
                    <p>${item.title}</p>
                    <a href="${item.path}/index.html">Preview</a>
                </div>
            </div>
        `

    })
}

// async function init() {
//     const directoryHandle = await window.showDirectoryPicker()
//     console.log(directoryHandle);
// }