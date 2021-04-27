import {BrowserRouter as Router,Route,Link,Switch, Redirect} from 'react-router-dom'
import Home from "./component/home/home";
import Start from "./component/start/start"

import { DataProvider } from "./component/store/store";
import './App.css'
function App() {
  return (
    <DataProvider>     
        <Home />
    </DataProvider>
  );
}

export default App;
