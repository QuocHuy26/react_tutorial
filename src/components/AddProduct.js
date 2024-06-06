import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [newPrice, setNewPrice] = useState();
    const navigate = useNavigate();

    const handleAdd = async () => {
        const newProduct = {
            name: newName,
            quantity: newQuantity,
            unit_price: newPrice,
        }
        try {
            await axios.post(`http://localhost:3001/products`, newProduct)
            .then((res) =>{
                if (res.status === 201){
                    console.log("added");
                }
            });
        } catch (error) {
            console.error('Error adding data: ', error);
        }
        navigate('/list');
    };

    return (
        <div style={{width:'840px', position: 'absolute', left: '50%', top: '40%',transform: 'translateX(-50%)',}}>
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
                    <Link to="/list">
                        <button
                            style={{padding:'5px', borderRadius:'5px', cursor: 'pointer'}}
                        >
                            Thoát
                        </button>
                    </Link>
                    <button
                        style={{padding:'5px', borderRadius:'5px', backgroundColor:'#0ff', cursor: 'pointer'}}
                        onClick={()=>handleAdd()}
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;