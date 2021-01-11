import React, { Component } from 'react'
import {
  Breadcrumb,
  Card,
  Table,
  Message,
  Button,
  Row,
  Col,
  Input,
  Modal,
  Form,
} from 'antd'

// 导入样式
import './user.scss'
// 导入 每页,页数
import { PAGE_SIZE as pageSize } from '../../config/index'
const { Search } = Input
class User extends Component {
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
      // 当前页码
      current: 1,
      // 控制添加用户对话框的弹出与隐藏
      addUsersVisible: false,
    }
  }

  componentDidMount() {
    this.getUserList()
  }

  // 获取用户列表的数据
  getUserList = async (number = 1) => {
    console.log(number)
    const { data: res } = await this.$http.get('users', {
      params: { pagesize: pageSize, pagenum: number },
    })
    if (res.meta.status !== 200) {
      Message.error('获取用户列表数据失败')
    }
    // console.log(res.data.users)
    console.log(res)
    Message.success('获取用户列表成功')
    this.setState({
      usersList: res.data.users,
      total: res.data.total,
      current: res.data.pagenum,
    })
  }

  showModal = () => {
    this.setState({
      addUsersVisible: true,
    })
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      addUsersVisible: false,
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      addUsersVisible: false,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      console.log(values)
      if (!err) {
        // 验证通过发起网络请求
        const { data: res } = await this.$http.post('users', values)
        console.log(res)
        if (res.meta.status !== 201) {
          return Message.error('表单项错误,请从新输入')
        }
        // 创建成功,关闭弹出
        this.setState({
          addUsersVisible: false,
        })
        this.getUserList()
        Message.success('添加用户成功')
      }
    })
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
    const { getFieldDecorator } = this.props.form
    // 自定义邮箱验证规则
    var checkEmail = (rules, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法邮箱
        return cb()
      }
      cb(new Error('邮箱不合法'))
    }
    // 自定义手机号校验规则
    var checkMobile = (rules, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        // 合法手机号
        return cb()
      }
      cb(new Error('手机号不合法'))
    }
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
              <Button size="large" type="primary" onClick={this.showModal}>
                添加用户
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={this.state.usersList}
            columns={columns}
            bordered
            rowKey="id"
            // showQuickJumper defaultCurrent={2} total={500} onChange={onChange}
            pagination={{
              pageSize,
              showQuickJumper: true,
              total: this.state.total,
              current: this.state.current,
              onChange: this.getUserList,
            }}
          />
        </Card>

        {/* 点击添加用户对话框 */}
        <Modal
          title="添加用户"
          width="50%"
          okText="确定"
          cancelText="取消"
          visible={this.state.addUsersVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            {/* 用户名 */}
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { min: 4, message: '用户名最少4位' },
                ],
              })(<Input placeholder="用户名" />)}
            </Form.Item>
            {/* 密码 */}
            <Form.Item label="密码" labelAlign="left">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '密码不能为空' },
                  { min: 6, message: '密码最少6位' },
                ],
              })(<Input type="password" placeholder="密码" />)}
            </Form.Item>
            {/* 邮箱 */}
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入邮箱' },
                  { validator: checkEmail },
                ],
              })(<Input placeholder="邮箱" />)}
            </Form.Item>
            {/* 电话 */}
            <Form.Item>
              {getFieldDecorator('mobile', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { validator: checkMobile },
                ],
              })(<Input placeholder="电话" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const Wrapper = Form.create()(User)
export default Wrapper
