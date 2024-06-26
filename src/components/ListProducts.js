import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Row, Col, Table, Input, Select } from 'antd';
import debounce from 'lodash/debounce';
import "./style.css";

const {Option} =Select;

const ListProducts = () => {
    const [listProduct, setListProduct] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPrice, setSearchPrice] = useState('');
    const [tempList, setTempList] = useState([]);
    //do json-server không thực hiện được các phép toán >,>=,<,<= nên searchByPrice trên tempList

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/products/${id}`)
        .then((res) => {
            console.log(res);
            if (res.status === 200){
                console.log("Deleted");
                const newList = listProduct.filter(item => item.id !== id);
                setListProduct([...newList]);
                setTempList([...newList]);
            }
        });
    }

    const searchByName = debounce(async (name) => {
            await axios.get(`http://localhost:3001/products?name=${name}`)
            .then((res) => {
                if (res.status === 200){
                    let key = 1;
                    res.data.forEach(product => {
                        product.key = key++;                        
                    });
                    setListProduct([...res.data]);
                }
            })
    }, 1000);

    // const searchByPrice = async (priceRange) => {
    //     const price = priceRange.split("-");
    //     const min = parseInt(price[0]);
    //     if (price[1] === '?') {
    //         console.log(min);
    //         await axios.get(`http://localhost:3001/products?quantity_gte=${min}`)
    //         .then((res) => {
    //             if (res.status === 200){
    //                 let key = 1;
    //                 res.data.forEach(product => {
    //                     product.key = key++;                        
    //                 });
    //                 setListProduct([...res.data]);
    //             }
    //         })
    //     } else {
    //         const max = parseInt(price[1]);
    //         console.log(min,max);
    //         await axios.get(`http://localhost:3001/products?unit_price_gte=${min}&unit_price_lte=${max}`)
    //         .then((res) => {
    //             console.log(res);
    //             if (res.status === 200){
    //                 let key = 1;
    //                 res.data.forEach(product => {
    //                     product.key = key++;                        
    //                 });
    //                 setListProduct([...res.data]);
    //             }
    //         })
    //     }
    // };

    const searchByPrice = (priceRange) =>{
        const price = priceRange.split("-");
        const min = parseInt(price[0]);
        if (price[1] === '?') {
            const res = tempList.filter((item) => (item.unit_price >= min));
            let key = 1;
            res.forEach(product => {
                product.key = key++;
            });
            setListProduct([...res]);
        } else {
            const max = parseInt(price[1]);
            const res = tempList.filter((item) => (item.unit_price >= min && item.unit_price <= max));
            let key = 1;
            res.forEach(product => {
                product.key = key++;
            });
            setListProduct([...res]);
        }
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
                    setTempList([...res.data]);
                }
            })
        } catch (e) {
            console.log("error get listProduct: ", e);
        }
    }, []);

    useEffect(() => {
        searchByName(searchName);
    }, [searchName]);

    useEffect(() => {
        searchByPrice(searchPrice);
    }, [searchPrice]);

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
            <Row>
                <Col span={4}>
                    <Link to="/add">
                        <Button
                            type='primary'
                            style={{padding:'7px', borderRadius:'5px',}}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Link>
                </Col>
                <Col offset={4} span={8}>
                    <Input.Search
                        placeholder='Tìm kiếm theo tên'
                        enterButton='Tìm kiếm'
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </Col>
                <Col offset={2} span={6}>
                <Select
                    placeholder="Chọn khoảng giá"
                    style={{ width: "100%"}}
                    value={searchPrice}
                    onChange={(value) => setSearchPrice(value)}
                >
                    <Option value="0-20000">0 - 20000</Option>
                    <Option value="20000-50000">20000 - 50000</Option>
                    <Option value="50000-100000">50000 - 100000</Option>
                    <Option value="100000-?">100000+</Option>
                </Select>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={listProduct}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ListProducts;