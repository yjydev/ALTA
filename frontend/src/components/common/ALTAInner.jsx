import React from 'react';
import { Box } from '@mui/material';


export default function ALTAInner ({ children }) {
	return (
		<Box className='ALTAInner' sx={ALTAInner_style}>{children}</Box>
	)
}

const ALTAInner_style = {
	maxWidth: '1200px',
	height: '100vh',
	margin: '0 auto',
	backgroundColor: '#ffffff'
}