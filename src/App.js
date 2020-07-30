import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/header'
import AddItem from './components/AddItem';
import About from './components/pages/About';
import Axios from 'axios';

class App extends React.Component {
  state = {
      todos: []
  }


  componentDidMount (){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }



  // Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
}

//add Item
addItem = (title) => {
  // const newTodo = { 
  //   id: this.state.todos.length + 1,
  //   title: title,
  //   completed: false
  // }
  Axios.post('https://jsonplaceholder.typicode.com/todos',{
    title: title,
    completed: false
  }).then(res => this.setState({todos: [...this.state.todos, res.data]}));

}

//delete Item
deleteItem = (id) =>{
  Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE'
  }).then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
}
    render() {
        return ( 
          <Router>
            <div className="App">
              <div className="container">
                <Header/>
                <Route exact path="/" render={props => (
                  <React.Fragment>
                <AddItem addItem={this.addItem}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteItem={this.deleteItem}/>
                  </React.Fragment>
                )}/>
                <Route path="/about" component={About}/>
                
              </div>
            </div>
        </Router>

        );

    }
}
 export default App;

