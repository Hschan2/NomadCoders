import React, { useState } from "react";
import ReactDOM from "react-dom";
import '../App.css';

const useTabs = (initialValue, allTabs) => { // useTabs의 두개의 인자
    if(!allTabs || !Array.isArray(allTabs)) { // allTabs가 없거나 배열이 아닐 때
      return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentIndex, setCurrentIndex] = useState(initialValue); // 초기값 설정
    return {
      currentItem: allTabs[currentIndex],
      changeItem: setCurrentIndex
    };
  };

  const content = [
    {
      tab: "Select 1",
      content: "Content Page 1"
    },
    {
      tab: "Select 2",
      content: "Content Page 2"
    }
  ]
const App = () => {
    const {currentItem, changeItem} = useTabs(0, content);

    return(
        <div className="App">
            <p>
                {content.map((section, index) => (<button onClick={() => changeItem(index)}>{section.tab}</button>))}
                <div>
                  {currentItem.content}
                </div>
            </p>
        </div>
    )
}

export default App;
