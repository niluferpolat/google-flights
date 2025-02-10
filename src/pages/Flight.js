import React from 'react'
import { useLocation } from 'react-router-dom';

function Flight() {
    const location = useLocation();
    const { resp, requestBody } = location.state || {};
  return (
    <div>Flight</div>
  )
}

export default Flight