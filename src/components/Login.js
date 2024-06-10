import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../store/reducers/user';
import "./style.css";

const Login = () => {
    const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    console.log("user: ", user);
    const dispatch = useDispatch();

    const onFinish = () => {
        try {
            axios.get(`http://localhost:3001/users?email=${email}`)
            .then((res) => {
                console.log(res);
                if (res.data.length === 1){
                    dispatch(setUserToken(res.data[0].token));
                    navigate('/list');
                }
                else {
                    alert("Sai email");
                }
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    return (
        <>
            <div class="login-form">
                <p style={{fontSize:"30px", fontWeight:'bold'}}>ĐĂNG NHẬP</p>
                <Form>
                    <Form.Item
                        label='Email'
                        colon={false}
                        rules={[
                            {
                                required:true
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập email: abc'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        colon={false}
                        rules={[
                            {
                                required:true
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập password: 123456'
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                </Form>
                <Button type='primary' onClick={()=>onFinish()}>Đăng nhập</Button>
            </div>
        </>
    )
}
export default Login;