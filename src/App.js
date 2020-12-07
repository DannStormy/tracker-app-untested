import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login';
import Homepage from "./components/Homepage";


function App() {
  return (
    <Router>
      <div className="container">
      <Route path="/register" exact component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/homepage" component={Homepage} />
      </div>
    </Router>
  );
}

export default App;
