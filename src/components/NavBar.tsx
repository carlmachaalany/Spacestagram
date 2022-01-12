import { useEffect, useState } from 'react';
import 'react-bootstrap';
// import { Grid, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Animated} from 'react-animated-css';
import starLogo from '../assets/star-logo2.png';
import { FormControl, Select, MenuItem } from '@mui/material';

interface Props {
    filter: string;
    setFilter: any;
}

const NavBar: React.FC<Props> = ({filter, setFilter}) => {

    const [background, setBackground] = useState("rgba(17, 24, 39)");

    const changeBackground = () => {
        if (!document || !document.scrollingElement) {return};
        var scrolled = document.scrollingElement.scrollTop;
        // console.log(isInViewport(document.getElementById("contact")));
        if (scrolled >= 200) {
            if (background !== "rgba(17, 24, 39)") {
                setBackground("rgba(17, 24, 39)")
            }
        } else {
            if (background !== "transparent") {
                setBackground("transparent");
            }
        }
    }
    useEffect(() => {
        changeBackground();
    }, []);
    
    document.addEventListener("scroll", e => {
        changeBackground();
    }); 


    const [open, setOpen] = useState(false);


    return (
      <AppBar className="d-flex justify-content-center align-items-center" style={{boxShadow: "none", position: 'fixed', backgroundColor: background, transition: "all .5s ease", WebkitTransition: "all .5s ease", MozTransition: "all .5s ease"}}>
        <Toolbar className="d-flex justify-content-between" style={{width: "90%"}}>
            <Animated animationIn="fadeInLeft" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    SPACESTAGRAM
                </Typography>
            </Animated>
            <FormControl style={{color: "#fff"}} sx={{ m: 1, minWidth: 120 }}>
                <Select
                style={{color: "#fff"}}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'likes'}>Likes</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
      </AppBar>
        // <AppBar className="mb-4" position="static" style={{backgroundColor: background}}>
        //     <Toolbar>
        //         <Typography variant="h6" style={{flexGrow: 1}}>
        //         News
        //         </Typography>
        //     </Toolbar>
        // </AppBar>
        // <header id="home" className="header">
        //     <div className="navbar-area" style={{backgroundColor: `${background}`}}>
        //         <div className="container">
        //             {/* <div className="row"> */}
        //                 {/* <div className="col-lg-12"> */}
        //             <nav className="navbar navbar-expand-lg py-3">
        //                 <a className="navbar-brand wow fadeInLeftBig slower" href="/">
        //                     <img src={logo} alt="Logo" />
        //                 </a>
        //                 <Button onFocus={() => console.log('navbar focused')} variant="link" className="navbar-toggler collapsed" onClick={() => {
        //                     // setOpen(!open);
        //                     toggleHamburger();
        //                 }} aria-controls="collapse-links" data-toggle="collapse" data-target="#collapse-links">
        //                     <span className="toggler-icon"></span>
        //                     <span className="toggler-icon"></span>
        //                     <span className="toggler-icon"></span>
        //                 </Button>
                                                            
        //                 <div className="navbar-collapse collapse" id="collapse-links">
        //                     <ul id="nav"  className="nav navbar-nav ml-auto">
        //                         <li className="nav-item active">
        //                             {isLanding ? <a style={decorationNone} onClick={removeDropdown} className="page-scroll" href="#hero-area">Home</a> : <Link style={{ textDecoration: 'none' }} onClick={removeDropdown} to="/">Home</Link>}
        //                             {/* <a onClick={removeDropdown} className="page-scroll" href="#hero-area">Home</a> */}
        //                             {/* <Link onClick={removeDropdown} to="/">Home</Link> */}
        //                         </li>
        //                         <li className="nav-item">
        //                             {/* <Link className="page-scroll" to="/#services">Services</Link> */}
        //                             {/* <a onClick={removeDropdown} className="page-scroll" href="#services">Services</a> */}
        //                             {isLanding ? 
        //                             <ScrollLink onClick={removeDropdown} activeClass="active" to="services" offset={-100} spy={false} smooth={true} duration={500} style={{ cursor: "pointer", color: "black" }}>
        //                                 Services 
        //                             </ScrollLink> :
        //                             <Link style={decorationNone} onClick={removeDropdown} to={{ pathname:"/", state: { section: "services"}}}>Services</Link> }
        //                         </li>
        //                         <li className="nav-item">
        //                             <Link style={decorationNone} className="nav-links" onClick={removeDropdown} to="/fleet">Fleet</Link>
        //                         </li>
        //                         <li className="nav-item">
        //                             {/* {isLanding ? 
        //                             <a onClick={removeDropdown} className="page-scroll" href="#contact">Contact</a> : 
        //                             <Link onClick={removeDropdown} to="/#contact">Contact</Link>} */}
        //                             { isLanding ? 
        //                             <ScrollLink onClick={removeDropdown} activeClass="active" to="contact" offset={-100} spy={false} smooth={true} duration={500} style={{ cursor: "pointer", color: "black" }}>
        //                                 Contact 
        //                             </ScrollLink> :
        //                             <Link style={decorationNone} onClick={removeDropdown} to={{ pathname:"/", state: { section: "contact"}}}>Contact</Link>}

        //                         </li>
        //                         <li className="nav-item">
        //                             <Link style={decorationNone} onClick={removeDropdown} to="/booking">Booking</Link>
        //                         </li>
        //                     </ul> 
        //                 </div>
        //             </nav>
        //         </div>
        //     </div>
        // </header >
    );
}

export default NavBar;


