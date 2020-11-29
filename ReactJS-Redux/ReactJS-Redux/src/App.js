import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Contact from './Contact';
import update from 'react-addons-update';

/*
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      value: this.state.value + 1
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.value}</h2>
        <button onClick={this.handleClick}>Press Me</button>
      </div>
    );
  }
}
*/
/*
class Codelab extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello {this.props.name}</h1>
        <h2>{this.props.number}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Codelab.propTypes = {
  name:PropTypes.string,
  number:PropTypes.isRequired,
};
Codelab.defaultProps = {
  name:"Unknown"
};
*/
/*
let array = [
  0,1,2,3,4,5
];

let changedArray = update(array, {  
  $splice : [[0,1], [1,1]] // 0과 2가 삭제 => 첫번째 인덱스 0이 삭제 후, 1이 0번째 인덱스가 되고 2가 1의 인덱스가 되기 때문
  // $splice : [[0,1], [1-1,1], [2-2, 1]] 로 변경시 순서대로 삭제.
});
*/
/*
let object = {
  a: '1',
  b: '2',
  c: {
    d: '3',
    e: '4',
    f: {
      change_this_value: '0', // 이 값만 변경하고 싶을 때
      this_stays_same: '6'
    }
  }
}

let changed = update(object, {
  c: {
    f: {
      change_this_value: {
        $set: '5'
      }
    }
  }
});
*/
/*
let array = [1,2,3,4,5,6];
// let changed = [ ...array, 7]; => array 배열에 7 추가, ...array는 스프레드 연산자
let changed = [ ...array.slice(0,2), '수정' ,...array.slice(3,array.length-1)]; // 2번째 인덱스를 삭제하고 싶다. 가운데는 삭제된 자리에 수정될 단어, 마지막은 다음을 불러올 숫자
*/
class App extends Component {
  render() {
    /*
    let text = "hi";
    let textstyle = {
      backgroundColor : 'black',
      color:'white'
    }
    */
    return (
      <div>
        <Contact></Contact>
      </div>
    );
  }
}


export default App;
