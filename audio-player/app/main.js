const player = document.querySelector('.player')
const audio = document.querySelector('.audio')

const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const title = document.querySelector('.player__title')
const cover = document.querySelector('.player__cover')

const songs = ['lesson-1', 'lesson-2']
let songIndex = 0
let isPlaying = false;

function loadSong(song) {
    title.innerHTML = song
    audio.src = `./music/${song}.mp3`
}
loadSong(songs[songIndex])

//play
function playSong() {
    isPlaying = true
    audio.currentTime = 0
    audio.play()
}

//pause
function pauseSong() {
    isPlaying = false
    audio.pause()
}
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        playSong()
    } else {
        pauseSong()
    }
})