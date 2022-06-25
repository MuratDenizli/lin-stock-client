import React from 'react'
import { Link } from "react-router-dom";

import './box.css';

export default function Box({ title, id, imgurl }) {
    return (
        <div className='box'>
            <Link to={`/detail/${id}/${title}`}>
                <div className='box-title'>
                    <img src={imgurl} className='urun-resmi' alt='ürün' />
                    <h2>Ürün Adı: {title}</h2>
                </div>
            </Link>
        </div>
    )
}


