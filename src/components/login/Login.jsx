import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
// 导入样式
import './Login.scss'
class Login extends Component {
  // 提交表单事件
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 验证通过发起网络请求

        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-form">
        <div className="form-wrapper">
          {/* 标题区域 */}
          <div className="login-form-title">用户登录</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { min: 4, message: '用户名最少4位' },
                ],
              })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '密码不能为空' },
                  { min: 6, message: '密码最少6位' },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const Wrapper = Form.create()(Login)
export default Wrapper
