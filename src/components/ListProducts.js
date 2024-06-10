import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Table } from 'antd';
import "./style.css";

const ListProducts = () => {
    const [listProduct, setListProduct] = useState([]);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/products/${id}`)
        .then((res) => {
            console.log(res);
            if (res.status === 200){
                console.log("Deleted");
                const newList = listProduct.filter(item => item.id !== id);
                setListProduct([...newList]);
            }
        });
    }

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/products')
            .then((res) => {
                if (res.status === 200){
                    let key = 1;
                    res.data.forEach(product => {
                        product.key = key++;                        
                    });
                    setListProduct([...res.data]);
                }
            })
        } catch (e) {
            console.log("error get listProduct: ", e);
        }
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "key",
        },
        {
            title: "Tên",
            dataIndex: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "unit_price",
        },
        {
            title: "Hành động",
            dataIndex: "id",
            render: (id) => {
                return (
                    <>
                        <span
                            style={{margin:'0 5px',}}
                        >
                            <Link style={{color:'blue', textDecoration:'none'}} to={`/detail/${id}`}>Sửa</Link>
                        </span>
                        <span
                            style={{margin:'0 5px', color: 'red', cursor:'pointer',}}
                            onClick = {()=>handleDelete(id)}
                        >
                            Xóa
                        </span>
                    </>
                );
            },
        },
    ];

    return(
        <div className='list-container'>
            <Link to="/add">
                <Button
                    type='primary'
                    style={{padding:'7px', borderRadius:'5px',}}
                >
                    Thêm sản phẩm
                </Button>
            </Link>
            <Table
                columns={columns}
                dataSource={listProduct}
            />
        </div>
    );
};

export default ListProducts;