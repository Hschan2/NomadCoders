import React, { useState, useEffect, useRef } from 'react';
import defaultAxios from 'axios';
import  useS  from './study/useState';
import { useT } from './study/useTabs';
import './App.css';

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  const [trigger, setTrigger] = setState(0);
  if (!opts.url) {
    return;
  }
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now()); // Date의 숫자를 넣을 것이다.
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axiosInstance(opts).then(data => { // data를 가져왔을 때
      setState({
        ...state,
        loading: false,
        data
      });
    }).catch(error => {
      setState({...state, loading: false, error }); // 에러가 있다면 출력
    });
  }, [trigger]); // trigger를 useEffect가 받는다
  return { ...state, refetch };
}

const useNotification = (title, options) => {
  if(!("Notification" in window)) {
    return;
  }
  const fireNotif = () => {
    if(Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if(permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  }
  return fireNotif;
}

const useFullScreen = () => {
  const element = useRef();
  const triggerFull = () => {
    if(element.current) {
      element.current.requestFullScreen();
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
  };
  return { element, triggerFull, exitFull };
}

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });
  const onScroll = () => {
    setState({y: window.scrollY, x: window.scrollX}); // 스크롤 할 때마다 그 값의 스크롤의 X와 Y축 값 수정
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  return state;
}

const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if(typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
    useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    // eslint-disable-next-line no-unused-expressions
    () => {
      window.addEventListener("online", handleChange);
      window.addEventListener("offline", handleChange);
    };
  }, []);

  return status;
}

const useFadeIn = (duration = 1, delay = 1) => { // duration과 delay 초기값
  if(typeof duration !== 'number') { // 초기값이 숫자가 아니면 종료
    return;
  } else if (typeof delay !== 'number') {
    return;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const element = useRef(); // 참조, getElementById
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const { current } = element;
    current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
    current.style.opacity = 1;
  }, []);
  return { ref:element, style: { opacity: 0 } };
};

const useBeforeLeave = onBefore => {
  if(typeof onBefore !== "function") { // 함수형이 아니면 모두 호출 X
    return;
  }
  const handle = () => {
    onBefore();
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};

const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);

  return {enablePrevent, disablePrevent};
}

const useConfirm = (message = "", callback) => { // 기존 웹의 Confirm, 함수로
  if(typeof callback !== "function") {
    return;
  }
  const confirmAction = () => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm(message)) {
      callback();
    }
  };
  return confirmAction;
};
const useClick = onClick => {
  const element = useRef(); // 참조, document.getElementById와 같음
  useEffect(() => {
    if(element.current) { // element가 있다면
      element.current.addEventListener("click", onClick);
    } // Dependency가 존재한다면 componentDidMount만 호출
    return () => { // Dependency가 존재한다면 return 받은 함수는 componentDidUpdate 때 호출
      if(element.current) {
        element.current.addEventListener("click", onClick);
      } // useEffect가 mount 되었을 때 call
    };
  }, []); // Dependency가 존재하지 않음, Dependency가 존재하지 않을 때 componentDidMount, componentDidUpdate가 호출
          // []를 넣는 이유는 []가 없다면 update될 때마다 호출, []를 넣으면 componentDidMount때 한 번만 실행
  return element;
}
const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = title;
  };
  useEffect(updateTitle, [title]); // []는 Dependency, title이 바뀔 때만 실행
  return setTitle;
}
function App() {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.am/api/v2/list_movies.json"
  });
  console.log(`Loading: ${loading}\nError: ${error}\nData: ${JSON.stringify(data)}`); // 로딩했을 때, 에러가 났을 때 데이터 console로

  const triggerNotif = useNotification("알람을 듣겄소?", {body: "추천하지는 않소!"});

  const { element, triggerFull, exitFull } = useFullScreen();

  const {y} = useScroll();

  const Online = useNetwork();

  const fadeIn = useFadeIn(5, 3);

  const begForLife = console.log("Page Leave!");
  useBeforeLeave(begForLife);

  const {enablePrevent, disablePrevent} = usePreventLeave();

  const ClickWorld = () => console.log("Click");
  const confirmButton = useConfirm("계속 하시겠어요?", ClickWorld);

  const sayClick = () => console.log("SayClick");
  const title = useClick(sayClick); // () 안에 속성이 들어 있으면 element가 있는 것

  const inputs = useRef(); // 참조, document.getElementById와 같음
  setTimeout(() => inputs.current.focus(), 1000); // 1초 후 inputs를 참조한 input에 focus

  const titleUpdate = useTitle("TITLE");
  setTimeout(() => titleUpdate("Five Seconds"), 5000); // 5초 뒤 TITLE 변경
  const sayHello = () => console.log("Developer");

  const [number, setNumber] = useState(0); // number, setNumber을 0으로 초기화 선언(useState)
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello, [number]); // useEffect는 componentDidMount, componentWillUpdate, number의 숫자만 바뀔 때 sayHello 실행, 뒤에 []는 Dependency
  return (
    <div className="App" style={{height: "1000vh" }}>
      <div>hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
      <p>
        <input ref={inputs} placeholder="Test"></input>
      </p>
      <p>
        <h1 ref={title}>Click</h1>
      </p>
      <p>
        <button onClick={confirmButton}>Click me</button>
      </p>
      <p>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </p>
      <p>
        <h1 {...fadeIn}>FadeIn</h1>
      </p>
      <p>
        {Online ? "ONLINE":"OFFLINE"}
      </p>
      <p>
        <h1 style={{color : y > 100 ? "red" : "blue"}}>Scroll</h1>
      </p>
      <p>
        <div ref={element}>
          <img src="study.jpg" />
          <button onClick={exitFull}>Exit Screen</button>
        </div>
        <button onClick={triggerFull}>Full Screen</button>
      </p>
      <p>
        <button onClick={triggerNotif}>Notification</button>
      </p>
      <p>
        <h1>{data && data.status}</h1>
        <h2>{loading && "loading"}</h2>
        <button onClick={refetch}>Refetch</button>
      </p>
    </div>
  );
}

export default App;
