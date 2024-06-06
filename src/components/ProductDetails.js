import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [newPrice, setNewPrice] = useState();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/products/${id}`)
            .then((res) => {
                if (res.status === 200){
                    setNewName(res.data.name);
                    setNewQuantity(res.data.quantity);
                    setNewPrice(res.data.unit_price);
                }
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    },[id]);

    const handleUpdate = async (id) => {
        const data = {
            name: newName,
            quantity: newQuantity,
            unit_price: newPrice,
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
        <div style={{width:'840px', position: 'absolute', left: '50%', top: '40%',transform: 'translateX(-50%)',}}>
            <div style={{width:'50%', padding: '5px',position: 'absolute', left: '50%', top: '-50%',
                transform: 'translateX(-50%)', backgroundColor:'white', border:'1px solid black'}}>
                <h1>Chi tiết</h1>
                <p>
                    <b>Tên: </b>
                    {newName &&
                        <input
                            placeholder='Nhập tên sản phẩm'
                            defaultValue={newName}
                            onChange={(e) => {setNewName(e.target.value);}}
                        >
                        </input>
                    }
                </p>
                <p>
                    <b>Số lượng: </b>
                    {newQuantity &&
                    <input
                        placeholder='Nhập số lượng'
                        defaultValue={newQuantity}
                        onChange={(e) => {setNewQuantity(e.target.value);}}
                    >
                    </input>
                    }
                </p>
                <p>
                    <b>Đơn giá: </b>
                    {newPrice&&
                    <input
                        placeholder='Nhập đơn giá'
                        defaultValue={newPrice}
                        onChange={(e) => {setNewPrice(e.target.value);}}
                    >
                    </input>
                    }
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
                        onClick={()=>handleUpdate(id)}
                    >
                        Cập nhật
                    </button>
                    
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;