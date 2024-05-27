import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const ListProducts = () => {
    // const list = [
    //     {
    //         name: 'Bánh mỳ',
    //         quantity: '10',
    //         unit_price: '10000',
    //     },
    //     {
    //         name: 'Sữa',
    //         quantity: '13',
    //         unit_price: '6000',
    //     },
    //     {
    //         name: 'Nước ngọt',
    //         quantity: '20',
    //         unit_price: '16000',
    //     },
    // ];

    const [listProduct, setListProduct] = useState();
    const [id, setId] = useState('0');
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [newPrice, setNewPrice] = useState();
    const [productDetail, setProductDetail] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [tableFlag, setTableFlag] = useState(false);

    const handleShowDetail = (product) =>{
        setProductDetail(product);
        //ở đây nếu setProductDetail([...product]) sẽ lỗi "product is not iterable"???
        setShowDetail(true);
    }
    const handleCancelShowDetail = () =>{
        setProductDetail();
        setShowDetail(false);
    }

    const handleShowUpdate = (product) =>{
        setId(product.id);
        setNewName(product.name);
        setNewQuantity(product.quantity);
        setNewPrice(product.unit_price);
        setShowUpdate(true);
    }
    const handleCancelShowUpdate = () =>{
        setProductDetail();
        setShowUpdate(false);
    }
    const handleUpdate = async (id) => {
        // const newList = [...listProduct];
        // const targetItem = newList.find(item => item.key === id);
        // targetItem.name = newName;
        // targetItem.quantity = newQuantity;
        // targetItem.unit_price = newPrice;
        // setListProduct([...newList]);
        const data = {
            name: newName,
            quantity: newQuantity,
            unit_price: newPrice,
        };
        try {
            await axios.put(`http://localhost:3001/products/${id}`, data);
            setShowUpdate(false);
            setTableFlag((tableFlag) => !tableFlag);
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }

    const handleDelete = async (id) => {
        // const newList = listProduct.filter(item => item.key !== key);
        // while (key <= newList.length) {
        //     newList[key-1].key = key ++;
        // };
        // setListProduct([...newList]);
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            setTableFlag((tableFlag) => !tableFlag);
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    }

    const handleShowAdd = () => {
        setShowAdd(true);
    }
    const handleCancelShowAdd = () => {
        setShowAdd(false);
    }
    const handleAdd = async () => {
        const newProduct = {
            key: listProduct.length + 1,
            name: newName,
            quantity: newQuantity,
            unit_price: newPrice,
        }
        // const newList = [...listProduct, newProduct];
        // setListProduct([...newList]);
        try {
            await axios.post(`http://localhost:3001/products`, newProduct);
            setTableFlag((tableFlag) => !tableFlag);
        } catch (error) {
            console.error('Error adding data: ', error);
        }
        setShowAdd(false);
    }

    useEffect(() => {
        // let key = 1;
        // list.forEach((item) => {
        //     item.key = key ++;
        // });
        // setListProduct([...list]);
        axios.get('http://localhost:3001/products')
            .then(response => {
                let key = 1;
                const list = response.data.map((item) => {
                    item.key = key ++;
                    return item;
                });
                console.log(list);
                setListProduct([...list]);
            })
    }, [tableFlag]);

    const Product = React.memo (({item})=>{
        console.log('rendering: ', item.name);
        return (
            <>
                <p style={{width:'100%', margin: '3px 0', borderTop: '1px solid #666',
                                        display: 'flex', alignItems:'center',}}
                >
                    <span style={{width: '100px'}}>{item.key}</span>
                    <span style={{width: '200px'}}>{item.name}</span>
                    <span style={{width: '150px'}}>{item.quantity}</span>
                    <span style={{width: '150px'}}>{item.unit_price}</span>
                    <span
                        style={{width: '80px', color: '#0f5', cursor:'pointer',}}
                        onClick = {()=>handleShowDetail(item)}
                    >
                        Xem
                    </span>
                    <span
                        style={{width: '80px', color: 'blue', cursor:'pointer',}}
                        onClick = {()=>handleShowUpdate(item)}
                    >
                        Sửa
                    </span>
                    <span
                        style={{width: '80px', color: 'red', cursor:'pointer',}}
                        onClick = {()=>handleDelete(item.id)}
                    >
                        Xóa
                    </span>
                </p>
            </>
        )
    }, 
    (prevProp, nextProp) =>{
        return (prevProp.item.name === nextProp.item.name &&
                prevProp.item.quantity === nextProp.item.quantity &&
                prevProp.item.unit_price === nextProp.item.unit_price);
    });
    return(
        <div>
            <button
                style={{position: 'absolute', left: '50%', top: '35%', transform: 'translateX(-50%)',
                        backgroundColor:'#05F', color:'white', padding:'7px', borderRadius:'5px', cursor: 'pointer',
                    }}
                onClick={()=> handleShowAdd()}
            >
                Thêm sản phẩm
            </button>
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
                {listProduct? (listProduct.length? (listProduct.map((item) =>{
                    return (
                        <>
                            {/* <p style={{width:'100%', margin: '3px 0', borderTop: '1px solid #666',
                                        display: 'flex', alignItems:'center',}}
                            >
                                <span style={{width: '100px'}}>{item.key}</span>
                                <span style={{width: '200px'}}>{item.name}</span>
                                <span style={{width: '150px'}}>{item.quantity}</span>
                                <span style={{width: '150px'}}>{item.unit_price}</span>
                                <span
                                    style={{width: '80px', color: '#0f5', cursor:'pointer',}}
                                    onClick = {()=>handleShowDetail(item)}
                                >
                                    Xem
                                </span>
                                <span
                                    style={{width: '80px', color: 'blue', cursor:'pointer',}}
                                    onClick = {()=>handleShowUpdate(item)}
                                >
                                    Sửa
                                </span>
                                <span
                                    style={{width: '80px', color: 'red', cursor:'pointer',}}
                                    onClick = {()=>handleDelete(item.id)}
                                >
                                    Xóa
                                </span>
                            </p> */}
                            <Product key={item.id} item={item}/>
                            {showAdd && (
                                <div style={{width:'100%', height:'100%', position: 'absolute', left: '0', top: '0',backgroundColor:'gray',}}>
                                    <div style={{width:'50%', padding: '5px',position: 'absolute', left: '50%', top: '-50%',
                                        transform: 'translateX(-50%)', backgroundColor:'white', border:'1px solid black'}}>
                                        <h1>Thêm sản phẩm</h1>
                                        <p>
                                            <b>Tên: </b>
                                            <input
                                                placeholder='Nhập tên sản phẩm'
                                                onChange={(e) => {setNewName(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <p>
                                            <b>Số lượng: </b>
                                            <input
                                                placeholder='Nhập số lượng'
                                                onChange={(e) => {setNewQuantity(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <p>
                                            <b>Đơn giá: </b>
                                            <input
                                                placeholder='Nhập đơn giá'
                                                onChange={(e) => {setNewPrice(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <div style={{display:'flex', justifyContent:'space-around'}}>
                                            <button
                                                style={{padding:'5px', borderRadius:'5px', cursor: 'pointer'}}
                                                onClick={()=>handleCancelShowAdd()}
                                            >
                                                Thoát
                                            </button>
                                            <button
                                                style={{padding:'5px', borderRadius:'5px', backgroundColor:'#0ff', cursor: 'pointer'}}
                                                onClick={()=>handleAdd()}
                                            >
                                                Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showDetail && (
                                <div style={{width:'100%', height:'100%', position: 'absolute', left: '0', top: '0',backgroundColor:'gray',opacity:'0.65'}}>
                                    <div style={{width:'50%', padding: '5px',position: 'absolute', left: '50%', top: '-50%',
                                        transform: 'translateX(-50%)', backgroundColor:'white', border:'1px solid black'}}>
                                        <h1>Chi tiết</h1>
                                        <p><b>Tên: </b>{productDetail.name}</p>
                                        <p><b>Số lượng: </b>{productDetail.quantity}</p>
                                        <p><b>Đơn giá: </b>{productDetail.unit_price}</p>
                                        <button
                                            style={{padding:'5px', borderRadius:'5px', cursor: 'pointer'}}
                                            onClick={()=>handleCancelShowDetail()}
                                        >
                                            Thoát
                                        </button>
                                    </div>
                                </div>
                            )}
                            {showUpdate && (
                                <div style={{width:'100%', height:'100%', position: 'absolute', left: '0', top: '0',backgroundColor:'gray',}}>
                                    <div style={{width:'50%', padding: '5px',position: 'absolute', left: '50%', top: '-50%',
                                        transform: 'translateX(-50%)', backgroundColor:'white', border:'1px solid black'}}>
                                        <h1>Cập nhật</h1>
                                        <p>
                                            <b>Tên: </b>
                                            <input
                                                placeholder='Nhập tên sản phẩm'
                                                defaultValue={newName}
                                                onChange={(e) => {setNewName(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <p>
                                            <b>Số lượng: </b>
                                            <input
                                                placeholder='Nhập số lượng'
                                                defaultValue={newQuantity}
                                                onChange={(e) => {setNewQuantity(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <p>
                                            <b>Đơn giá: </b>
                                            <input
                                                placeholder='Nhập đơn giá'
                                                defaultValue={newPrice}
                                                onChange={(e) => {setNewPrice(e.target.value);}}
                                            >
                                            </input>
                                        </p>
                                        <div style={{display:'flex', justifyContent:'space-around'}}>
                                            <button
                                                style={{padding:'5px', borderRadius:'5px', cursor: 'pointer'}}
                                                onClick={()=>handleCancelShowUpdate()}
                                            >
                                                Thoát
                                            </button>
                                            <button
                                                style={{padding:'5px', borderRadius:'5px', backgroundColor:'#0ff', cursor: 'pointer'}}
                                                onClick={()=>handleUpdate(id)}
                                            >
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })):'No data'):'No data'}
            </div>
        </div>
    );
};

export default ListProducts;