document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        console.log('Pressed Enter')
        apiRequest();
    }
});

document.querySelector("#search").addEventListener("click", () => {
    console.log('Pressed search button')
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
            console.log('Loading images')
            loadImages(data);
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