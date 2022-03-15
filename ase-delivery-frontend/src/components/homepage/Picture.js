import React from "react";
import homepage_pic from './homepage_pic.jpg';
import './Pic_set.css';

console.log(homepage_pic); // /logo.84287d09.png

function Picture() {
    return <img src={homepage_pic} alt="" className="pic_set"/>;
}

export default Picture;