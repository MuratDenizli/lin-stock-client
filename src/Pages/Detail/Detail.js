import axios from "axios";
import React, { useEffect, useState } from "react";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css';

import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function Detail() {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    let params = useParams();

    const [error, setError] = useState(null);
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://lin-stock-app.herokuapp.com/api/${params.id}`)
            .then(({ data }) => {
                setDetailData(data.data);
                console.log(data.data)
            })
            .catch((error) => setError(error));
    },[]);

    if (error) {
        return <div>An error occured: {error.message}</div>;
    }

    return (
        <div>
            <div className="page-title">
                <h1>{params.title}</h1>
            </div>
            <div className="detail-layout">
                {(detailData) && detailData.length > 0 ? detailData.map((item) => (
                    <div className="box" key={item.id}>
                            <Slider {...settings}>
                                {item.attributes.resimler.map((elem, index) => (
                                    <div key={index}>
                                        {!elem.content.isVideo ? <img
                                            className="urun-resmi"
                                            src={elem.content.url}
                                            alt="ürün"
                                        />:
                                        <video controls loop="false" muted controlsList='nodownload'>
                                            <source src={$elem.content.url`#t=0.1`} type="video/mp4"></source>
                                        </video>
                                        }
                                    </div>
                                ))}
                            </Slider>
                        <h2>Ürün Adı: {item.attributes.adi}</h2>
                        <p>Fiyat: {item.attributes.fiyati}</p>
                    </div>
                )) : <div>
                    <h2>Ürün kataloğu eklenecek.</h2>
                </div>}

            </div>
        </div>
    );
}
