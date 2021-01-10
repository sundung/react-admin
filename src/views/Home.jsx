import React, { Component } from 'react'

import { Layout, Menu, Icon, Button, Message } from 'antd'

import { Route, Switch, Link, Redirect } from 'react-router-dom'

// 导入欢迎页面
import Welcome from '../components/Welcome'
// 导入 用户列表页面
import User from '../components/user/User'
// 导入权限列表页面
import Roles from '../components/role/Roles'
import './Home.scss'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      menuList: [],
    }
  }

  componentDidMount() {
    this.getMenuList()
  }
  getMenuList = async () => {
    const { data: res } = await this.$http.get('menus')
    if (res.meta.status !== 200) return Message.error(res.meta.msg)
    this.setState({
      menuList: res.data,
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  // 点击退出按钮,退出登录
  loginout = () => {
    // 1.清空 token
    window.sessionStorage.clear()
    // 2.提示退出账户
    Message.success('退出当前账户')
    // 3.跳到登录页面
    this.props.history.replace('/login')
  }

  // 渲染组件
  mountedMenuList = () => {
    return this.state.menuList.map((item) => {
      return (
        <SubMenu
          key={item.id}
          title={
            <span>
              <Icon type="bars" />
              <span>{item.authName}</span>
            </span>
          }
        >
          {item.children.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <Link to={item.path}>
                  <Icon type="user" />
                  <span>{item.authName}</span>
                </Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    })
  }
  render() {
    return (
      <div>
        <Layout className="home-container">
          <div className="home-header">
            <Header className="title">商城后台管理系统</Header>
            <Button className="btn" onClick={this.loginout}>
              退出
            </Button>
          </div>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {this.mountedMenuList()}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content>
                <Switch>
                  <Route path="/home/welcome" component={Welcome}></Route>
                  <Route path="/home/users" component={User}></Route>
                  <Route path="/home/roles" component={Roles}></Route>
                  <Route path="/home/rights" component={User}></Route>
                  <Route path="/home/goods" component={User}></Route>
                  <Route path="/home/params" component={User}></Route>
                  <Route path="/home/categories" component={User}></Route>
                  <Route path="/home/orders" component={User}></Route>
                  <Route path="/home/reports" component={User}></Route>
                  <Redirect to="/home/welcome" />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
