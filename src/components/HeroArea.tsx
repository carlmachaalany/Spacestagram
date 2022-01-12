import React from 'react';
import 'bootstrap';
import {Animated} from 'react-animated-css';

const HeroArea: React.FC = () => {

    return (
        <div id="hero-area">
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                <Animated animationIn="fadeInLeft" animationInDuration={1500} animationOut="fadeOut" isVisible={true}>
                        <h1 style={{fontSize: '4rem', textAlign: "start", color: "#fff"}} ><strong>WELCOME TO <br/>SPACESTAGRAM!</strong></h1>
                </Animated>
            </div>
        </div>
    )
}

export default HeroArea;