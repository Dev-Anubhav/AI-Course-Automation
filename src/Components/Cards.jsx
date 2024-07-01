import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, IconButton, Typography, Grid } from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import axios from 'axios';
import { APICONFIG } from '../PYTHONCONFIG/config';
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const MyCards = () => {
    const [data,setData]=useState({})
  
  const imageUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; 

  useEffect(()=>{
   const fetchData =async()=>{
const response = await axios.get(APICONFIG.trainingModel);
setData(response.data)
   }
   fetchData();
  },[])


  return (
    <Grid container spacing={3} direction="column">
   
        <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ padding: "20px" }}>
            <CardMedia
              component="img"
              height="150" 
              image={imageUrl}
              alt={data.title}
            />
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                {data.title}
              </Typography>
            </CardContent>
            <CardActions sx={{mr:"50px"}}>
           <FaEye className='text-[#17a2b8] border-[#17a2b8] text-xl mr-3 cursor-pointer' />
             <MdModeEdit className='text-[#17a2b8] text-xl cursor-pointer' />
            </CardActions>
          </Card>
          <Card sx={{ padding: "20px" }}>
            <CardMedia
              component="img"
              height="150" 
              image={imageUrl}
              alt={data.title}
            />
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                {data.title}
              </Typography>
            </CardContent>
            <CardActions sx={{mr:"50px"}}>
           <FaEye className='text-[#17a2b8] border-[#17a2b8] text-xl mr-3 cursor-pointer' />
             <MdModeEdit className='text-[#17a2b8] text-xl cursor-pointer' />
            </CardActions>
          </Card>
        </Grid>
    </Grid>
  );
};

export default MyCards;
