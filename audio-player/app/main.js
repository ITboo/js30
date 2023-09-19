const player = document.querySelector('.player')
const audio = document.querySelector('.audio')

const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const title = document.querySelector('.player__title')
const cover = document.querySelector('.player__cover')

const progressContainer = document.querySelector('.player__progress-container')
const progress = document.querySelector('.progress-bar')

const songs = ['lesson-1', 'lesson-2', 'lesson-3']
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
nextBtn.addEventListener('click', playNext)

function playNext() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
function playPrev() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1

    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', playPrev)

// Progress
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)