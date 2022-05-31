import React from 'react';
import  Carousel  from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import albumCovers from "../AlbumCovers";

function Homepage() {

    const albumCarousel = albumCovers.map (album => {
        return <Carousel.Item key={album.image}>
          
            <img style={{height: "500px", width: "500px"}} src={album.image}/>
           
            
        </Carousel.Item>
    })

    return (
  <Carousel style={{height: "500px", width: "500px", margin: "auto", marginTop: '40px' }}>
        {albumCarousel}
  </Carousel>


    )
}

export default Homepage;