const body = document.querySelector("body");

const IMG_NUMBER = 3;

/* API를 이용할 때
function handleImgLoad() {

}
*/
function paintImage(imgNumber) {
    const image = new Image();
    const date = new Date();
    const hours = date.getHours();
    if(hours >= 06 && hours < 12) {
        image.src = `image/morning${imgNumber + 1}.jpg`;
        image.classList.add("bgImage");
        body.appendChild(image)
    } else if(hours >= 12 && hours < 18) {
        image.src = `image/afternoon${imgNumber + 1}.jpg`;
        image.classList.add("bgImage");
        body.appendChild(image)
    } else if(hours >= 18 && hours <= 23) {
        image.src = `image/evening${imgNumber + 1}.jpg`;
        image.classList.add("bgImage");
        body.appendChild(image)
    } else if(hours >=00 && hours < 06) {
        image.src = `image/night${imgNumber + 1}.jpg`;
        image.classList.add("bgImage");
        body.appendChild(image)
    }
    // image.addEventListener("loadend", handleImgLoad); API를 이용할 때
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();