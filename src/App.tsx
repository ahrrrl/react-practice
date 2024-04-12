import Postcode from './practiceList/addressInput/AddressInput';
import ModalTest from './practiceList/modal/Modaltest';
import TodoList from './practiceList/todoList/Todolist';
import ControlledForm from './practiceList/uncontrolledInput/ControlledForm';
import UncontrolledForm from './practiceList/uncontrolledInput/UncontrolledForm';

function App() {
  return (
    <div>
      <TodoList />
      <ModalTest />
      <Postcode />
      <UncontrolledForm />
      <ControlledForm />
      <div style={{ height: '1000px', backgroundColor: 'brown' }}></div>
    </div>
  );
}

export default App;
