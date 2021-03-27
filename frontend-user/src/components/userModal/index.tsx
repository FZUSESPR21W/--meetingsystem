import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.less';
import delay from 'delay';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.UserModal);

interface UserModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  login: Function;
  register: Function;
}

const UserModal = ({
  visible,
  setVisible,
  login,
  register,
}: UserModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 19 },
  };

  const onLogin = async (values: any) => {
    setLoginLoading(true);
    const isOk = await login(values);
    await delay(2000);
    setLoginLoading(false);
    console.log(isOk);
    if (isOk) {
      message.info('登录成功');
      setVisible(false);
    }
  };

  const onRegister = async (values: any) => {
    setRegisterLoading(true);
    const { email, password } = values;
    const isOk = await register({ email, password });
    await delay(2000);
    setRegisterLoading(false);
    if (isOk) {
      message.info('注册成功');
      onLogin({ email, password });
    }
  };

  const loginComponent = () => {
    return (
      <Form name="login" onFinish={onLogin}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: '请输入一个合法的邮箱',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={setClsPrefix('login', 'login-form-button')}
            loading={loginLoading}
          >
            登录
          </Button>
          或者
          <Button type="link" onClick={() => setIsLogin(false)}>
            现在注册!
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const registerComponent = () => {
    return (
      <Form name="register" onFinish={onRegister} {...layout}>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '请输入一个合法的邮箱',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              validator: (_, value: string) =>
                value.length >= 6
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入至少6个英文字母')),
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入确认密码！',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('两次输入的用户名和密码不一致!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            loading={registerLoading}
            type="primary"
            htmlType="submit"
            className={setClsPrefix('register', 'register-form-button')}
          >
            注册
          </Button>
          或者
          <Button type="link" onClick={() => setIsLogin(true)}>
            现在登录
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      className={setClsPrefix()}
      title={isLogin ? '登录' : '注册'}
    >
      {isLogin && loginComponent()}
      {!isLogin && registerComponent()}
    </Modal>
  );
};

export default UserModal;
