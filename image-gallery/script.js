const input = document.querySelector("#input")
const search = document.querySelector("#search")
const clearBtn = document.querySelector('#clear')

clearBtn.addEventListener('click', () => {
    input.value = '';
})

input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        console.log('Pressed Enter');
        apiRequest();
    }
});

search.addEventListener("click", () => {
    console.log('Pressed search button');
    apiRequest();
});


apiRequest = () => {

    document.querySelector("#grid").textContent = "";

    const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=9&client_id=bbYR55nFa3bL0xSrlOsqTELpdpSgHAouGO2m_2tYhRg';

    fetch(url)

        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })

        .then(data => {
            if (data.results.length === 0) {
                console.log('Nothing')
                loadError()
            } else {
                console.log('Loading images')
                console.log(data)
                loadImages(data);
            }
        })

        .catch(error => console.log(error));
}

loadImages = (data) => {
    for (let i = 0; i < data.results.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
        image.addEventListener("dblclick", function () {
            window.open(data.results[i].links.download, '_blank');
        })
        document.querySelector("#grid").appendChild(image);
    }
}

loadError = () => {
    const errorMsg = 'Sorry! Nothing was found for your ' + input.value;
    const error = document.createElement("span")
    error.textContent = errorMsg
    error.classList.add('nothing')
    document.querySelector("#grid").appendChild(error);
}