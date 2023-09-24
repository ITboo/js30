const player = document.querySelector('.player')
const audio = document.querySelector('.audio')

const playBtn = document.querySelector('.playBtn')
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
        cover: '1',
        time: '1:11',
    },
    {
        title: 'lesson-2',
        cover: '2',
        time: '0:47',
    },
    {
        title: 'lesson-3',
        cover: '3',
        time: '0:51',
    },]
let songIndex = 0
let isPlaying = false;
let isMuted = false;

document.onload
loadSong(songs[songIndex])

function loadSong(song) {

    title.innerHTML = `세종한국어: ${song.title}`
    audio.src = `./music/${song.title}.mp3`
    cover.src = `./assets/img/${song.cover}.png`
    end.textContent=`${song.time}`
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

function toggleBtn() {
    playBtn.classList.toggle('paused');
}
playBtn.addEventListener('click', toggleBtn);

//next-prev
function playNext() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', playNext)
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
 
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }

    start.textContent = currentMinutes + ":" + currentSeconds;
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

//autoplay
audio.addEventListener('ended', playNext)

//mute
document.querySelector('#muted').onclick = function() {
    if (audio.muted === true) {
      document.querySelector('#muted').innerHTML = 'Отключить звук'
      audio.muted = false;
    } else {
      document.querySelector('#muted').innerHTML = 'Включить звук'
      audio.muted = true;
    }
  }