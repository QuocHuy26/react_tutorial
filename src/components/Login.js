import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../store/reducers/user';


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
            <div style={{width:"400px", position:"absolute", justifyContent:"center",
                        padding:"10px", border:"1px solid #aaa", borderRadius:"10px",
                        top:"50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <p style={{fontSize:"30px", fontWeight:'bold'}}>ĐĂNG NHẬP</p>
                <Form>
                    <Form.Item
                        label='Email'
                        colon={false}
                        required='true'
                    >
                        <Input
                            placeholder='Nhập email: abc'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        colon={false}
                        required='true'
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