import React from 'react';
import { Box, Grid, Typography, Link, Stack, Divider, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

// Footer component to be used on the main page
const Footer = () => {
  return (
    <Box sx={{
      bgcolor: '#212121', // Dark background color
      color: '#fff',
      py: 6,
      px: { xs: 2, sm: 4, md: 8 },
      mt: 'auto', // Pushes the footer to the bottom of the page
      fontFamily: 'Inter, sans-serif'
    }}>
      <Grid container spacing={4}>

        {/* Products Section */}
        <Grid item xs={12} sm={6} md={2.5}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, borderBottom: '2px solid #ff6b6b', display: 'inline-block', pb: '4px' }}>
            PRODUCTS
          </Typography>
          <Stack spacing={1}>
            {['Prices Drop', 'New Products', 'Best Sales', 'Contact Us', 'Sitemap'].map((productLink) => (
              <Link href="#" color="inherit" underline="none" key={productLink} sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: '#feca57' } }}>
                {productLink}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Our Company Section */}
        <Grid item xs={12} sm={6} md={2.5}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, borderBottom: '2px solid #ff6b6b', display: 'inline-block', pb: '4px' }}>
            OUR COMPANY
          </Typography>
          <Stack spacing={1}>
            {['Delivery', 'Legal Notice', 'Terms And Conditions', 'About Us', 'Secure Payment'].map((companyLink) => (
              <Link href="#" color="inherit" underline="none" key={companyLink} sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: '#feca57' } }}>
                {companyLink}
              </Link>
            ))}
          </Stack>
        </Grid>
        
        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, borderBottom: '2px solid #ff6b6b', display: 'inline-block', pb: '4px' }}>
            CONTACT
          </Typography>
          <Stack spacing={2} direction="column">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, color: '#ff6b6b' }} />
              <Typography variant="body2">419 State 414 Rte Beaver Dams, New York(NY), 14812, USA</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, color: '#ff6b6b' }} />
              <Typography variant="body2">(607) 936-8058</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, color: '#ff6b6b' }} />
              <Typography variant="body2">Example@Gmail.Com</Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={6} md={2.5}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, borderBottom: '2px solid #ff6b6b', display: 'inline-block', pb: '4px' }}>
            SOCIAL MEDIA
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="facebook" sx={{ color: '#fff' }} href="#">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="x-twitter" sx={{ color: '#fff' }} href="#">
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="linkedin" sx={{ color: '#fff' }} href="#">
              <LinkedInIcon />
            </IconButton>
            <IconButton aria-label="instagram" sx={{ color: '#fff' }} href="#">
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

      {/* Payment Logos and Copyright Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>

        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          Copyright © All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};
export default Footer;
