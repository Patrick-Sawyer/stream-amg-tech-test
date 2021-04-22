import './styles/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './styles/main.scss';
import './styles/navbar.scss';
import Fight from './pages/Fight';
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Fight />
          </Route>
          
        </Switch>
        <div style={{position: "absolute", top: 0, width: "100%", height: "100%"}}>
          <Navbar />
        </div>
      </Router>
    </div>
  );
}

export default App;
