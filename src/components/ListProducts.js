import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button } from 'antd';

const ListProducts = () => {
    const [listProduct, setListProduct] = useState();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`)
            .then((res) => {
                console.log(res);
                if (res.status === 200){
                    console.log("Deleted");
                    const newList = listProduct.filter(item => item.id !== id);
                    setListProduct([...newList]);
                }
            });
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/products')
            .then(response => {
                setListProduct([...response.data]);
            })
    }, []);

    const Product = React.memo(({item, index})=>{
        // console.log('rendering: ', item.name);
        item.key = index + 1;
        return (
            <>
                <p style={{width:'100%', margin: '3px 0', borderTop: '1px solid #666',
                                        display: 'flex', alignItems:'center',}}
                >
                    <span style={{width: '100px'}}>{item.key}</span>
                    <span style={{width: '200px'}}>{item.name}</span>
                    <span style={{width: '150px'}}>{item.quantity}</span>
                    <span style={{width: '150px'}}>{item.unit_price}</span>
                    {/* <span
                        style={{width: '80px', color: '#0f5', cursor:'pointer',}}
                        onClick = {()=>handleShowDetail(item)}
                    >
                        Xem
                    </span> */}
                    
                    <span
                        style={{width: '120px',}}
                    >
                        <Link style={{color:'blue', textDecoration:'none'}} to={`/detail/${item.id}`}>Sửa</Link>
                    </span>
                    <span
                        style={{width: '120px', color: 'red', cursor:'pointer',}}
                        onClick = {()=>handleDelete(item.id)}
                    >
                        Xóa
                    </span>
                </p>
            </>
        )
    }, 
    (prevProp, nextProp) =>{
        console.log('abc' + prevProp.item.name === nextProp.item.name);
        console.log(prevProp.item.quantity === nextProp.item.quantity);
        console.log(prevProp.item.unit_price === nextProp.item.unit_price);
        return prevProp.item.unit_price === nextProp.item.unit_price;
    });

    return(
        <div>
            <Link to="/add">
                <Button
                    type='primary'
                    style={{position: 'absolute', left: '50%', top: '35%', transform: 'translateX(-50%)',
                            padding:'7px', borderRadius:'5px',
                        }}
                >
                    Thêm sản phẩm
                </Button>
            </Link>
            <div style={{width:'840px', position: 'absolute', left: '50%', top: '40%',
                    transform: 'translateX(-50%)', border: '2px solid #000',}}
            >
                <p style={{width:'100%', margin: '5px 0', display: 'flex',
                            fontWeight: 'bold', alignItems:'center',}}
                >
                    <span style={{width: '100px'}}>STT</span>
                    <span style={{width: '200px'}}>Tên</span>
                    <span style={{width: '150px'}}>Số lượng</span>
                    <span style={{width: '150px'}}>Đơn giá</span>
                    <span style={{width: '240px'}}>Hành động</span>
                </p>
                {listProduct? (listProduct.length? (listProduct.map((item, index) =>{
                    return (
                        <React.Fragment key = {item.id}>
                            <Product key={item.id} item={item} index={index}/>
                        </React.Fragment>
                    );
                })):'No data'):'No data'}
            </div>
        </div>
    );
};

export default ListProducts;