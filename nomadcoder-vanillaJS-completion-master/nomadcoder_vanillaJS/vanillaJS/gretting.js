const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text); // 컴퓨터에 로컬 저장
}

function handleSubmit(event) {
    event.preventDefault(); // 이벤트의 기본 동작 막기, enter 눌러도 텍스트 사라지지 않는다.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const date = new Date();
    const hours = date.getHours();
    form.classList.remove(SHOWING_CN); // form의 클래스 제거
    greeting.classList.add(SHOWING_CN); // greeting의 클래스 추가
    if(hours >= 06 && hours < 12) {
        greeting.innerHTML = `Good Morning. ${text}`;
    } else if(hours >= 12 && hours < 18) {
        greeting.innerHTML = `Good Afternoon. ${text}`;
    } else if(hours >= 18 && hours <= 23) {
        greeting.innerHTML = `Good Evening. ${text}`
    } else if(hours >=00 && hours < 06) {
        greeting.innerHTML = `Good Night. ${text}`
    }
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS); // 컴퓨터에 저장
    if(currentUser === null) { // 로컬 스토리지(유저)가 없을 때
        askForName();
    } else {
        // 로컬 스토리지가 있을 때
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();