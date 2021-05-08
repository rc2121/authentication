import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import LoginForm from './components/loginForm/LoginForm';
import SignupForm from './components/signupForm/SignupForm';
import UserList from './components/userList/UserList';
import UserForm from './components/userForm/UserForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/sign-in' component={LoginForm} />
          <Route exact path='/sign-up' component={SignupForm} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/form' component={UserForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
