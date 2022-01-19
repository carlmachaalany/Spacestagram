import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Animated} from 'react-animated-css';
import { FormControl, Select, MenuItem } from '@mui/material';
import StarIcon1 from '@mui/icons-material/Star';

interface Props {
    filter: string;
    setFilter: any;
}

const NavBar: React.FC<Props> = ({filter, setFilter}) => {

    const [background, setBackground] = useState("rgb(16, 17, 56)");

    const changeBackground = () => {
        if (!document || !document.scrollingElement) {return};
        var scrolled = document.scrollingElement.scrollTop;
        // console.log(isInViewport(document.getElementById("contact")));
        if (scrolled >= 200) {
            if (background !== "rgb(16, 17, 56)") {
                setBackground("rgb(16, 17, 56)")
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

    return (
      <AppBar className="d-flex justify-content-center align-items-center" style={{boxShadow: "none", position: 'fixed', backgroundColor: background, transition: "all .5s ease", WebkitTransition: "all .5s ease", MozTransition: "all .5s ease"}}>
        <Toolbar className="d-flex justify-content-between align-items-center navbar-toolbar">
            <div className="d-flex">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    <strong id="spacestagram">ડρꪖᥴꫀડ𝕥ꪖᧁ𝕣ꪖꪑ</strong>
                </Typography>
                <Animated animationIn="bounceInRight" animationInDuration={1500} animationOut="fadeOut" isVisible={true}><StarIcon1 fontSize='medium'/></Animated>
            </div>
            <FormControl className="justify-self-end form-wrapper" sx={{borderRadius: "10px", backgroundColor: "rgba(38, 34, 43, 0.8)", border: '1px solid #ced4da', minWidth: 100, maxHeight: 50}}>
                <Select
                className="select-filter"
                style={{color: "#fff"}}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem className="filter-item" value={'all'}>𝓐𝓵𝓵</MenuItem>
                    <MenuItem value={'likes'}>𝓛𝓲𝓴𝓮𝓼</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;


