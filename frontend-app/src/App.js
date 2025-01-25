import logo from './logo.svg';
import './App.css';
import UserForm from './Components/UserDetails/UserDetails';
import CreateUser from './Components/UserDetails/CreateUser';
import Dashboard from './Components/UserDetails/Dashboard';

function App() {
  return (
    <div className="App">

      <h1>User Management Application</h1>
      <UserForm />
    
    </div>
  );
}

export default App;
