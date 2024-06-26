import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./style.css";

const AddProduct = () => {
    const navigate = useNavigate();

    const handleAdd = (values) => {
        const newProduct = {
            name: values.name,
            quantity: values.quantity,
            unit_price: values.unit_price,
        }
        try {
            axios.post(`http://localhost:3001/products`, newProduct)
            .then((res) =>{
                if (res.status === 201){
                    console.log("added");
                    navigate('/list');
                }
            });
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    };

    return (
        <div className="product-info">
            <Form onFinish={handleAdd}>
                <h1>Thêm sản phẩm</h1>
                <Form.Item
                    label="Tên"
                    labelAlign="left"
                    name="name"
                    rules={
                        [{
                            required: true,
                            message: "Nhập tên sản phẩm",
                        },]
                    }
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    labelAlign="left"
                    name="quantity"
                    rules={
                        [{
                            required: true,
                            message: "Nhập số lượng sản phẩm",
                        },]
                    }
                >
                    <Input placeholder="Nhập số lượng sản phẩm" />
                </Form.Item>
                <Form.Item
                    label="Đơn giá"
                    labelAlign="left"
                    name="unit_price"
                    rules={
                        [{
                            required: true,
                            message: "Nhập đơn giá sản phẩm",
                        },]
                    }
                >
                    <Input placeholder="Nhập đơn giá sản phẩm" />
                </Form.Item>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <Link to="/list">
                        <Button
                            style={{padding:'5px', borderRadius:'5px'}}
                        >
                            Thoát
                        </Button>
                    </Link>
                    <Button type="primary" style={{padding:'5px', borderRadius:'5px'}} htmlType="submit">
                        Thêm
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddProduct;