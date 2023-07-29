import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";

import React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: "url('https://images.livemint.com/img/2022/12/09/1600x900/Nifty_1667546435835_1670548265677_1670548265677.jpg')", // Replace with your background image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px', // Adjust the maximum width as needed
});

const Title = styled(Typography)({
  marginBottom: '16px',
  fontSize: '24px',
  fontWeight: 600,
  color: 'black',
});

const Message = styled(Typography)({
  marginBottom: '24px',
  fontSize: '18px',
  fontWeight: 500,
  color: '#000',
  textAlign: 'center',
});

const GoogleButton = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '48px',
  borderRadius: '24px',
  backgroundColor: '#db4a39',
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#c53728',
  },
});

const Spinner = styled(CircularProgress)({
  color: '#fff',
  marginRight: '8px',
});

const StockModal = () => {
  const [showSpin, setShowSpin] = React.useState<boolean | undefined>(undefined);
  const { data: session } = useSession();
  
  const handleLoginWithGoogle = () => {
    // Handle login with Google logic
    setShowSpin(true)
    signIn('google')
    // setShowSpin(false)
  };

  // if(session)
  //   window.location.href = 'http://localhost:3000/trending';

  return (
    <Modal open={true} onClose={() => {}}>
      <Container>
        <ContentContainer>
          <Title>Welcome to Stockin</Title>
          <Message>Sign in to access your account</Message>
          <GoogleButton disabled = {showSpin} variant="contained" onClick={() => handleLoginWithGoogle()}>
            {showSpin && <Spinner size={20} />}
            Login with Google
          </GoogleButton>
        </ContentContainer>
      </Container>
    </Modal>
  );
};

export default StockModal;
