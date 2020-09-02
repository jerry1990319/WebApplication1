import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NewsTips, error } from '@/utils/index.js';
import './index.less';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};
const Login = () => {
    const [form] = Form.useForm();
    const handleSubmit = (value) => {
        const { Username, password, remember } = value;
        if (Username === 'admin' && Number(password) === 123) {
            NewsTips('登录成功!');
            window.location.href = '/home';
            if (remember === true && true === true) {
                localStorage.setItem('Username', Username);
                localStorage.setItem('password', password);
            } else {
                localStorage.setItem('Username', '');
                localStorage.setItem('password', '');
            }

        } else {
            error('登录失败!', '用户名或密码错误,请重新登录');
            localStorage.setItem('Username', '');
            localStorage.setItem('password', '');
        }
    }
    return (
        <div className="login-container">
            <div className="info">
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={handleSubmit}
                    {...formItemLayout}
                    className="form"
                >
                    <FormItem
                        name="Username"
                        label="Username:"
                        rules={[{ required: true, message: '账号不能为空!' }]}
                        initialValue={localStorage.getItem('Username')}
                    // initialValue="user"
                    >
                        <Input className="uname" />
                    </FormItem>
                    <FormItem
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空!' }]}
                        initialValue={localStorage.getItem('password')}
                    >
                        <Input.Password className="upwd" border={false} />
                    </FormItem>
                    <FormItem {...formItemLayout} name="remember" valuePropName="checked" initialValue={true}>
                        <Checkbox>Remember me</Checkbox>
                    </FormItem>
                    <FormItem {...formItemLayout}>
                        <Button type="primary" htmlType="submit" className="btn">
                            Log In
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div >
    );
}


export default Login;
