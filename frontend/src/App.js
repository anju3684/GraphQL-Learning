import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Route path="/" component={null}></Route>
    <Route path="/auth" component={null}></Route>
    <Route path="/events" component={null}></Route>
    <Route path="/booking" component={null}></Route>
    </BrowserRouter>
  );
}

export default App;
