import React, { Component } from 'react'

import { Layout, Menu, Icon, Button, Message } from 'antd'
import './Home.scss'
const { Header, Sider, Content } = Layout
export default class Home extends Component {
  state = {
    collapsed: false,
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
  render() {
    return (
      <div>
        <Layout>
          <div className="home-header">
            <Header className="title">商城后台管理系统</Header>
            <Button className="btn" onClick={this.loginout}>
              退出
            </Button>
          </div>
        </Layout>

        <Layout className="home-container">
          {/* 左侧,侧边栏 */}
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
