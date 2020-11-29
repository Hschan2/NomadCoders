import React, { useState } from "react";
import ReactDOM from "react-dom";
import '../App.css';

const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue); // 초기값 설정
    const onchange = event => {
      const {
        target: {value}
      } = event;
      let willUpdate = true;
      if(typeof validator === "function") {
        willUpdate = validator(value);
      }
      if(willUpdate) {
        setValue(value);
      }
    };
    return {value, onchange};
  };

const App = () => {
    const [item, setItem] = useState(1); // useState는 array를 리턴 (ex. useState(1)[0]), () 안에 값은 초기값
    const increamentItem = () => setItem(item + 1); // 누르면 item이 1씩 증가
    const decreamentItem = () => setItem(item - 1); // 누르면 item이 1씩 감소

    const maxLen = value => value.length < 10;
    const name = useInput("I'm" , maxLen); // {...name}을 사용하면 name의 모든 것을 출력, {name.value}와 같다
    
    return(
        <div className="App">
        <h1>Hello {item}</h1>
        <button onClick={increamentItem}>increament</button>
        <button onClick={decreamentItem}>decreament</button>
        <p>
            <input placeholder="name" {...name} />
        </p>
        </div>
    )
}

export default App;