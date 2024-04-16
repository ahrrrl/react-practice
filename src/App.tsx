import ModalTest from './practiceList/modal/Modaltest';
import TodoList from './practiceList/todoList/Todolist';
import ControlledForm from './practiceList/uncontrolledForm/ControlledForm';
import UncontrolledForm from './practiceList/uncontrolledForm/UncontrolledForm';

function App() {
  return (
    <div>
      <TodoList />
      <ModalTest />
      <UncontrolledForm />
      <ControlledForm />
      <div style={{ height: '1000px', backgroundColor: 'brown' }}></div>
    </div>
  );
}

export default App;
