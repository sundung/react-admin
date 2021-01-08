
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
// 导入登录页面
import Login from "./components/login/Login"
function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path='/login' component={Login}></Route>
        {/* 从定向到登录页 */}
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
