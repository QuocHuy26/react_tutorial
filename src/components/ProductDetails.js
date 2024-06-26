import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./style.css";

const ProductDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/products/${id}`)
            .then((res) => {
                if (res.status === 200){
                    form.setFieldsValue({
                        name: res.data.name,
                        quantity: res.data.quantity,
                        unit_price: res.data.unit_price,
                    });
                }
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    },[id]);

    const handleUpdate = async (values) => {
        const data = {
            name: values.name,
            quantity: values.quantity,
            unit_price: values.unit_price,
        };
        try {
            await axios.put(`http://localhost:3001/products/${id}`, data)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Updated successfully");
                    navigate("/list");
                } 
            });
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }

    return (
        <div className="product-info">
            <h1>Chi tiết</h1>
            <Form form={form} onFinish={handleUpdate}>
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
                    <Input
                        placeholder="Nhập tên sản phẩm"
                    />
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
                    <Input
                        placeholder="Nhập số lượng sản phẩm"
                    />
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
                    <Input
                        placeholder="Nhập đơn giá sản phẩm"
                    />
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
                        Cập nhật
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default ProductDetails;