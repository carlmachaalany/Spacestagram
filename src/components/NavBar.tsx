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
import { FormControl, Select, MenuItem, FormControlLabel, Switch, FormGroup } from '@mui/material';

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
                    <strong>SPACESTAGRAM</strong>
                </Typography>
            </Animated>
            <FormControl sx={{borderRadius: "10px", backgroundColor: "rgba(38, 34, 43, 0.8)", border: '1px solid #ced4da', minWidth: 100, maxHeight: 50}}>
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
    );
}

export default NavBar;


