const scoreBtn = document.querySelector('#score')
const scoreModal = document.getElementById('scoreModal');
const closeBtn = document.querySelector('.close')

scoreBtn.onclick = function() {
    scoreModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == scoreModal) {
        scoreModal.style.display = "none";
    }
}
