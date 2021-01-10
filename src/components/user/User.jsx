import React, { Component } from 'react'
import { Breadcrumb, Card, Table, Message, Button, Row, Col, Input } from 'antd'

// 导入样式
import './user.scss'

const { Search } = Input
export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 查询条件
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      // 用户列表
      usersList: [],
      // 总页数
      total: 0,
      // 用户列表的 列名
      columns: {},
    }
  }

  // 获取用户列表的数据
  getUserList = async () => {
    const { data: res } = await this.$http.get('users', {
      params: this.state.queryInfo,
    })
    if (res.meta.status !== 200) {
      Message.error('获取用户列表数据失败')
    }
    console.log(res.data.users)
    Message.success('获取用户列表成功')
    this.setState({
      usersList: res.data.users,
      total: res.data.total,
    })
    console.log(this.usersList)
  }

  componentDidMount() {
    this.getUserList()
  }
  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'mobile',
      },
      {
        title: '角色',
        dataIndex: 'role_name',
      },
      {
        title: '状态',
        dataIndex: 'mg_state',
      },

      {
        title: '操作',
        dataIndex: 'id',
        render: () => {
          return (
            <div>
              <Button type="primary" icon="edit"></Button>
              <Button type="danger" icon="delete"></Button>
              <Button type="primary" icon="setting"></Button>
            </div>
          )
        },
        width: '20%',
      },
    ]
    return (
      <div>
        {/* 面包屑导航区域 */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/home">首页</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        {/* 卡片式图区域 */}
        <Card>
          {/* 搜索框区域 */}
          <Row gutter={16}>
            <Col span={8}>
              <Search
                size="large"
                placeholder="请输入用户名"
                onSearch={(value) => console.log(value)}
                enterButton
              />
            </Col>
            <Col>
              <Button size="large" type="primary">
                添加用户
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={this.state.usersList}
            columns={columns}
            bordered
            rowKey="id"
          />
        </Card>
      </div>
    )
  }
}
