
import { BrowserRouter, Route, Switch } from "react-router-dom"
// 导入登录页面
import Login from "./components/login/Login"

import Home from "./views/Home"
function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/home' component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
