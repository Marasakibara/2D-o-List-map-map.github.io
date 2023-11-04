import './css/App.css';
import Header from './components/Header.tsx';
import ToDoList from './components/todolist/ToDoList.tsx';

function App() {
  return (
    <div className="App">
      <Header />
      <ToDoList />
    </div>
  );
}

export default App;
