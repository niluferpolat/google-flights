import React,{useState} from 'react'
import { IconButton, Popover, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HomePageForm from '../components/HomePageForm';
import CitySelector from '../components/CitySelector';
import ExploreMap from '../components/ExploreMap';
function Home() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Tekirdağ");
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  return (
    <div style={{
        textAlign: "center",
        width: "60%",
        margin: "0 auto"
      }}>
            <img style={{maxWidth:"800"}} src={`${process.env.PUBLIC_URL}/images/light-mode.png`}/>
            <Typography variant='h3'>Flights</Typography>
            
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",  
    flexDirection: "column"  
  }}>
    <HomePageForm />
    <Typography variant='h6' sx={{ marginTop: "1rem",alignSelf: "flex-start" }}>
      Find cheap flights from {selectedCity} to anywhere 
      <IconButton aria-describedby={id} onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography sx={{ padding: 2, maxWidth: 300 }}>
          These suggestions are based on the cheapest fares to popular
          destinations in the next six months. Prices include required taxes +
          fees for 1 adult. Optional charges and bag fees may apply.
        </Typography>
      </Popover>
    </Typography>
    <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
    <ExploreMap/>
  </div>
         </div>
    
  )
}

export default Home