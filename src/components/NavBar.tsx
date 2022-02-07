import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Animated } from 'react-animated-css';
import { FormControl, Select, MenuItem } from '@mui/material';
import starLogo from '../assets/star_logo.png';

interface Props {
    filter: string;
    setFilter: any;
}

const NavBar: React.FC<Props> = ({ filter, setFilter }) => {

    const reloadPage = () => {
        window.location.reload();
    }

    return (
        <AppBar className='navbar-bg d-flex justify-content-center align-items-center' style={{ boxShadow: "none", position: 'fixed', transition: "all .5s ease", WebkitTransition: "all .5s ease", MozTransition: "all .5s ease" }}>
            <Toolbar className="d-flex justify-content-between align-items-center navbar-toolbar">
                <div className="d-flex" style={{ cursor: "pointer" }} onClick={reloadPage}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <strong id="spacestagram">ડρꪖᥴꫀડ𝕥ꪖᧁ𝕣ꪖꪑ</strong>
                    </Typography>
                    <Animated animationIn="bounceInRight" animationInDuration={1500} animationOut="fadeOut" isVisible={true}><img width="30" height="30" src={starLogo} alt="" title=""></img></Animated>
                    {/* <Animated animationIn="bounceInRight" animationInDuration={1500} animationOut="fadeOut" isVisible={true}><img width="30" height="30" src="https://cdn-icons.flaticon.com/png/512/2881/premium/2881505.png?token=exp=1644123702~hmac=371fd7450b0744f31c7f04e37fde08a8" alt="" title=""></img></Animated> */}
                </div>
                <FormControl className="justify-self-end form-wrapper" sx={{ borderRadius: "10px", backgroundColor: "rgba(38, 34, 43, 0.8)", border: '1px solid #ced4da', minWidth: 100, maxHeight: 50 }}>
                    <Select
                        className="select-filter"
                        style={{ color: "#fff" }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem className="filter-item" value={'all'}>All</MenuItem>
                        <MenuItem value={'likes'}>Likes</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;


