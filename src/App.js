// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import { Switch, Route, Router } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link, Redirect, Switch, NavLink } from 'react-router-dom'; 

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import Layout from './components/Layout/Layout';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {
  return (
   
    <Router>
    <Layout>
     
    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/auth'>
        <AuthPage />
      </Route>
      <Route path='/profile'>
        <UserProfile />
      </Route>
    </Switch>

  </Layout>
  </Router>

  );
}

export default App;
