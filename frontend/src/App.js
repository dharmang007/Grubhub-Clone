import React,{Component} from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import store from './stores';
import { Provider } from 'react-redux';
import './App.css';


class App extends Component{  
  render(){
  
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App;
