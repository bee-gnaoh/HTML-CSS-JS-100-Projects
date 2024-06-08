const watchBtn = document.getElementById('watchBtn')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal .close')
const video = document.querySelector('.modal video')

watchBtn.addEventListener('click', () => {
    modal.style.display = 'block'
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
    video.pause()
    video.currentTime  = 0
})