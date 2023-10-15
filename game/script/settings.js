const settingsBtn = document.querySelector('#settings')
const settingModal = document.getElementById('settingModal');


settingsBtn.onclick = function() {
    console.log('open settings modal')
    settingModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == settingModal) {
        settingModal.style.display = "none";
    }
}

