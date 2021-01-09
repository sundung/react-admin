import React, { Component } from 'react'

import { Layout, Menu, Icon, Button, Message } from 'antd'
import { Link } from 'react-router-dom'
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
    console.log(this.state.menuList)
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
        <SubMenu title={item.authName} key={item.id}>
          {item.children.map((item) => {
            return (
              <Menu.Item
                title={item.authName}
                key={item.id}
                style={{ color: '#fff' }}
              >
                <Link to={item.path}>{item.authName}</Link>
                {item.path}
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
              <Content></Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
