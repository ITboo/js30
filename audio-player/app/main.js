const player = document.querySelector('.player')
const audio = document.querySelector('.audio')

const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const randomBtn = document.querySelector('.random')

const title = document.querySelector('.player__title')
const cover = document.querySelector('.cover__img')

const progressContainer = document.querySelector('.player__progress-container')
const progress = document.querySelector('.progress-bar')

const start = document.querySelector('.start-value')
const end = document.querySelector('.end-value')

const songs = [
    {
        title: 'lesson-1',
        cover: '1'
    },
    {
        title: 'lesson-2',
        cover: '2'
    },
    {
        title: 'lesson-3',
        cover: '3'
    },]
let songIndex = 0
let isPlaying = false;

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerHTML = `세종한국어: ${song.title}`
    audio.src = `./music/${song.title}.mp3`
    cover.src=`./assets/img/${song.cover}.png`
}


//play
function playSong() {
    isPlaying = true
    audio.play()
}

//pause
function pauseSong() {
    isPlaying = false
    audio.pause()
}
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong()
})
nextBtn.addEventListener('click', playNext)

//next-prev
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

//timer
function reset() {
    start.textContent = "00:00";
    end.textContent = "00:00";
}
function setUpdate(e) {
    const { currentTime, duration } = e.srcElement

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    start.textContent = currentMinutes + ":" + currentSeconds;
    end.textContent = durationMinutes + ":" + durationSeconds;
}



//autoplay
audio.addEventListener('ended', playNext)