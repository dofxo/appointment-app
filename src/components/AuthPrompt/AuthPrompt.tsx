import { Container, Typography, Box } from "@mui/material";

const AuthPrompt = () => {
  return (
    <Container>
      <Box>
        <Typography className="!text-3xl !font-[inherit] text-blue-600">
          برای دسترسی به این بخش، لطفاً وارد شوید یا عضویت خود را فعال کنید.
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPrompt;
