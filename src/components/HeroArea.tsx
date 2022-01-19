import React, { useEffect, useState } from 'react';
import {Animated} from 'react-animated-css';

const HeroArea: React.FC = () => {

    const [welcome, setWelcome] = useState<boolean>(false);
    const [spacestagram, setSpacestagram] = useState<boolean>(false);
    

    useEffect(() => {
        setTimeout(() => setWelcome(true), 1000);
        setTimeout(() => setSpacestagram(true), 1500);
    },[])
    
    return (
        <div id="hero-area">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                <h1 className="heroarea-welcome" style={{height: "fit-content", width: "fit-content", textAlign: "start", color: "#fff"}}>
                    <Animated animationIn="fadeInLeft" animationInDuration={1000} animationOut="fadeOut" isVisible={welcome}><strong>᭙ꫀꪶᥴꪮꪑꫀ 𝕥ꪮ</strong></Animated>
                    <Animated animationIn="fadeInRight" animationInDuration={1500} animationOut="fadeOut" isVisible={spacestagram}><strong>𝒮ρꪖᥴꫀ𝓈𝕥ꪖᧁ𝕣ꪖꪑ!</strong></Animated>
                </h1>
            </div>
        </div>
    )
}

export default HeroArea;