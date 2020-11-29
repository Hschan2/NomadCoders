/*
alert("I'm working to JS");

//variable => 변수

let a = 221; // let => 변수 초기화
let b = a -5;
// 변수 변경 불가 => const 사용, 변수 변경 가능 => let 사용
document.write(b + "<br>");

const days = ["hong", "55", true, "incheon"]; // 배열
const daystwo = {
	name:"hong",
	age:26,
	gender:"male",
	isHandsome:false,
	Movies:["cold", "monster","oldboy"], // 배열 속 배열
	food: [
		{
			name: "kimchi",
			hot:false
		},
		{
			name:"kimchi",
			hot:true
		}
	]
}

function hello(name, me){
	document.write("hello ", name," ", "i'm ", me, "<br>");
}
function hellos(names, mes){
	document.write(`hello ${names} i'm ${mes} <br>`);
}

hello("lyn", "hong");
hellos("lyn", "hong");
document.write(days + "<br>");
document.write(daystwo.name + "<br>");
document.write(daystwo.Movies + "<br>");
document.write(daystwo.food[0].name + "<br>");

const title = document.getElementById("title");
title.innerHTML= "new Text";
title.style.color = "yellow";

function handleResize() {
	document.write("i have been resized<br>");
}

window.addEventListener("resize", handleResize); // 윈도우 창 크기가 변할 때 출력

const cal = {
	plus: function(a,b){
		return a+b;
	}
}
const plus = cal.plus(5,5);
document.write(plus + "<br>");

if(10 > 5) {
	document.write("true<br>");
} else {
	document.write("false<br>");
}

const text = prompt("anything?");
document.write(text + "<br>");
*/

const title = document.querySelector("#title");
/*
const BASE_COLOR = "rgb(52, 73, 94)"; // 지정색
const OTHER_COLOR = "#7f8c8d";

function handleClick() { // 클릭했을 경우
	const currentColor = title.style.color;
	if(currentColor === BASE_COLOR) {
		title.style.color = OTHER_COLOR;
	} else {
		title.style.color = BASE_COLOR;
	}
}
*/

const CLICKED_CLASS = "clicked";

function handleClick() {
	//const currentClass = title.className;
	/*
	const hasClass = title.classList.contains(CLICKED_CLASS);
	if(!hasClass) { // !는 반대
		title.className = add(CLICKED_CLASS); // html의 class에 click을 추가
	} else {
		title.className = remove(CLICKED_CLASS); // html의 class에 click을 삭제
	}
	*/
	title.classList.toggle(CLICKED_CLASS); // 위에 있는 문장을 요약 (toggle)
}

function init() { //초기화
	//title.style.color = BASE_COLOR;
	title.addEventListener("click", handleClick); // click -> mouseenter 로 바꾸면 마우스 오버될 때 변화
}
init(); // 함수 실행
