const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // 할 일 목록 배열로 저장

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) { // filter, li의 각 id 가져오기
        return toDo.id !== parseInt(li.id); // li의 id를 int로 변환
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // object를 string으로 변환
}                                                          // JSON은 데이터 전달할 때, js가 그것을 다룰 수 있도록 object로 바꿔주는 기능

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span); // li 안에 span 넣기
    li.appendChild(delBtn); // li 안에 delBtn 넣기
    li.id = newId;
    toDoList.appendChild(li); // toDoList에 li 넣기
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // 배열에 넣어라
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function something(toDo) {

}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        }); // forEach 는 array에 담겨있는 데이터를 한 번씩 출력
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();