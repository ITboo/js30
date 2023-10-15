const scoreBtn = document.querySelector('#score')
const scoreModal = document.getElementById('scoreModal');
const closeBtn = document.querySelector('.close')
const clear = document.querySelector('.score__btn')
const zero = document.querySelectorAll('.place-count')

scoreBtn.onclick = function () {
    scoreModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == scoreModal) {
        scoreModal.style.display = "none";
    }
}

clear.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        zero[i].textContent = '0';
    }
    localStorage.clear();
    console.log('Clear localStorage')
    console.log(localStorage)
})

