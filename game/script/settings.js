const settingsBtn = document.querySelector('#settings')
const settingModal = document.getElementById('settingModal');

const showSettings = () => {
    console.log('open settings modal')
    settingModal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == settingModal) {
            settingModal.style.display = "none";
        }
    }
}
settingsBtn.addEventListener('click', showSettings)





