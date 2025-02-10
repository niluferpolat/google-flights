import React, { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Box,
  FormControl,
  MenuItem,
  Popover,
  Select,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Autocomplete
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/PersonOutline";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as FlightApi from "../api/FlightApi"
import "../styles/HomePageForm.css";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function HomePageForm() {
  const [departureOptions,setDepartureOptions]=useState([])
  const [arrivalOptions,setArrivalOptions]=useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
   const formik = useFormik({
    initialValues:{
      travelType: 'Round Trip',
      passengers:{
        adults: 1,
        children: 0,
        infantsInSeat: 0,
        infantsOnLap: 0,
      },
      classType: "Business",
      departure: "",
      arrival:'',
      departureDate: null,
    arrivalDate: null,
    },
    onSubmit: values => {
   

      let requestBody = {
        originId: values.departure.skyId,
        destinationId: values.arrival.skyId,
        originEntityId: values.departure.navigation.entityId,
        destinationEntityId: values.arrival.navigation.entityId,
        departureDate: dayjs(values.departureDate).format('YYYY-MM-DD'),
        cabinClass: values.classType.toLowerCase(),
        adult: values.passengers.adults,
        children: values.passengers.children,
        infant:
          (values.passengers.infantsInSeat || 0) + (values.passengers.infantsOnLap || 0),
        returnDate: values.arrivalDate
          ? dayjs(values.arrivalDate).format('YYYY-MM-DD')
          : null,
      };

    FlightApi.searchFlights(requestBody).then(resp =>{
      setLoading(true);
      navigate("/flight",{
        state:{
          resp,
          requestBody
        }
      })
    }).finally(()=>{
     
      setLoading(false)
    })
    },
  })
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "passenger-popover" : undefined;

  const handleIncrement = (type) => {
    formik.setFieldValue('passengers', {
      ...formik.values.passengers,
      [type]: formik.values.passengers[type] + 1,
    });
  };
  const handleDecrement = (type) => {
    if (formik.values.passengers[type] > 0) {
      formik.setFieldValue('passengers', {
        ...formik.values.passengers,
        [type]: formik.values.passengers[type] - 1,
      });
    }
  };
  const handleAnimationEnd = (e) => {
    e.currentTarget.classList.remove("rotate");
  };

  const handleSwapClick = (e) => {
    e.currentTarget.classList.add("rotate");
    const currentDeparture = formik.values.departure;
    const currentArrival = formik.values.arrival;
     
    
    formik.setValues({
      ...formik.values,
      departure: currentArrival,
      arrival: currentDeparture,
    })
  };
  

  const handleDeparture=(e)=>{
    FlightApi.getAirportDetail(e.target.value).then(data=>{
      setDepartureOptions(data.data)
    })
  }

  const handleArrival=(e)=>{
    FlightApi.getAirportDetail(e.target.value).then(data=>{
      setArrivalOptions(data.data)
    })
  }

 

  return (
    <div>
      {" "}
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          maxWidth: 1100,
          margin: "0 auto",
          position:"relative"
        }}
      >
        {loading ? <CircularProgress /> : 
 <form onSubmit={formik.handleSubmit}>
 <Grid container spacing={2}>
   <Grid item xs={12} sm={4}>
     <FormControl fullWidth variant="standard">
       <Select
       name="travelType"
         value={formik.values.travelType}
         onChange={formik.handleChange}
         displayEmpty
         sx={{
           display: "flex",
           alignItems: "center",
           padding: "8px",
         }}
       >
         <MenuItem value="Round Trip">
           <Box display="flex" alignItems="center" gap={1}>
             <SyncAltIcon fontSize="small" />
             <Typography>Round trip</Typography>
           </Box>
         </MenuItem>
         <MenuItem value="One way">
           <Box display="flex" alignItems="center" gap={1}>
             <ArrowRightAltIcon fontSize="small" />
             <Typography>One way</Typography>
           </Box>
         </MenuItem>
       </Select>
     </FormControl>
   </Grid>
   <Grid item xs={12} sm={4}>
     <FormControl fullWidth variant="standard">
       <Select
         aria-describedby={id}
         onClick={handleOpen}
         sx={{
           display: "flex",
           alignItems: "center",
           padding: "8px",
         }}
         displayEmpty
         MenuProps={{ disableScrollLock: true, open: false }}
       >
         <MenuItem>
           <Box display="flex" alignItems="center" gap={1}>
             <PersonIcon fontSize="small" />
             <Typography>
{(formik.values.passengers?.adults || 0) +
(formik.values.passengers?.children || 0) +
(formik.values.passengers?.infantsInSeat || 0) +
(formik.values.passengers?.infantsOnLap || 0)}
</Typography>

           </Box>
         </MenuItem>
       </Select>
       <Popover
         id={id}
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
           vertical: "bottom",
           horizontal: "left",
         }}
         transformOrigin={{
           vertical: "top",
           horizontal: "left",
         }}
       >
         <Box sx={{ padding: 2, width: 300 }}>
           {[
             { label: "Adults", type: "adults", description: "" },
             {
               label: "Children",
               type: "children",
               description: "Aged 2–11",
             },
             {
               label: "Infants",
               type: "infantsInSeat",
               description: "In seat",
             },
             {
               label: "Infants",
               type: "infantsOnLap",
               description: "On lap",
             },
           ].map((item) => (
             <Grid
               container
               key={item.type}
               spacing={2}
               justifyContent={"space-between"}
               alignItems="center"
             >
               <Grid item xs={5}>
                 <Typography>
                   {item.label}{" "}
                   <Typography variant="body2" color="text.secondary">
                     {item.description}
                   </Typography>
                 </Typography>
               </Grid>
               <Grid
                 item
                 xs={7}
                 display="flex"
                 justifyContent="flex-end"
               >
                 <IconButton
                   onClick={() => handleDecrement(item.type)}
                   size="small"
                 >
                   <RemoveIcon />
                 </IconButton>
                 <Typography variant="h6" sx={{ paddingX: 1 }}>
                   {formik.values.passengers[item.type]}
                 </Typography>
                 <IconButton
                   onClick={() => handleIncrement(item.type)}
                   size="small"
                 >
                   <AddIcon />
                 </IconButton>
               </Grid>
             </Grid>
           ))}

           <Grid container justifyContent="space-between">
             <Button onClick={handleClose} color="secondary">
               Cancel
             </Button>
             <Button onClick={handleClose} color="primary">
               Done
             </Button>
           </Grid>
         </Box>
       </Popover>
     </FormControl>
   </Grid>
   <Grid item xs={12} sm={4}>
     <FormControl fullWidth variant="standard">
       <Select
       name="classType"
         value={formik.values.classType}
         onChange={formik.handleChange}
         displayEmpty
         sx={{
           display: "flex",
           alignItems: "center",
           padding: "8px",
         }}
       >
         <MenuItem value="Economy">
           <Box display="flex" alignItems="center" gap={1}>
             <Typography>Economy</Typography>
           </Box>
         </MenuItem>
         <MenuItem value="Business">
           <Box display="flex" alignItems="center" gap={1}>
             <Typography>Business</Typography>
           </Box>
         </MenuItem>
       </Select>
     </FormControl>
   </Grid>
 </Grid>
 <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
   <Grid item xs={12} sm={7}>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",

         borderRadius: "8px",
         backgroundColor: "#fff",
       }}
     >
        <Autocomplete
        fullWidth
        style={{width:"200px"}}
        value={formik.values.departure}
        onChange={(e,newValue)=>{

         formik.setFieldValue("departure",newValue)}}
       options={departureOptions?.map(option=> option)}
       getOptionLabel={(option) => option.presentation?.suggestionTitle || ""} 
     renderInput={(params) => <TextField {...params} label="Departure" onChange={(e)=>handleDeparture(e)} />}
/>

       <IconButton
         className="circle-button"
         onClick={(e)=>handleSwapClick(e)}
         onAnimationEnd={handleAnimationEnd}
       >
         <SwapHorizIcon />
       </IconButton>
       <Autocomplete
        fullWidth
        getOptionLabel={(option) => option.presentation?.suggestionTitle || ""} 
        value={formik.values.arrival}
        onChange={(e,newValue)=>{formik.setFieldValue("arrival",newValue
        )}}
        style={{width:"200px"}}
       options={arrivalOptions?.map(option=> option)}
     renderInput={(params) => <TextField {...params} label="Arrival" onChange={(e)=>handleArrival(e)} />}
/>
     </Box>
   </Grid>
   <Grid item xs={12} sm={5}>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",

         borderRadius: "8px",
         backgroundColor: "#fff",
       }}
     >
   <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
value={formik.values.departureDate}
onChange={(newValue) => formik.setFieldValue('departureDate', newValue)}
label="Select a date"
name="departureDate"
renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>

{!formik.values.travelType.includes("One") && (
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
value={formik.values.arrivalDate}
onChange={(newValue) => formik.setFieldValue('arrivalDate', newValue)}
label="Select a date"
name="arrivalDate"
renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>
)}



     </Box>
   </Grid>
 </Grid>
 <Button type="submit" sx={{position:"absolute",
 marginLeft: "auto",
 marginRight: "auto",
 left: 0,
 right: 0,
 borderRadius:"40px",
 width:"100px",
 marginTop:"10px",
 textTransform:"capitalize"
 }} variant="contained"><SearchIcon/>Search</Button>
 </form>
        }
       
       
      </Box>
    </div>
  );
}

export default HomePageForm;
