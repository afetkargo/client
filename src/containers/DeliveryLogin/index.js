import {
    Avatar,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import LockIcon from "@mui/icons-material/Lock";
  import styled from "styled-components";
  import { pink } from "@mui/material/colors";
  import { useNavigate } from "react-router-dom";
  import Header from "../../components/Header";
  import receiverLoginRequest from "../../api/receiverLoginRequest";
  
  const StyledGrid = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
  `;
  
  const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let formData = {
        plateNo: data.get("plate"),
        receiverPassword: data.get("password")
      };
      const result = await receiverLoginRequest(formData);
      if(result?.code === 200){
        localStorage.setItem('afetkargo_alici', JSON.stringify(result?.data));
        navigate('/teslim');
      }
      console.log(result);
    };
    return (
      <>
        <Header text="Alıcı Girişi" />
        <Card
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "14px",
            maxWidth: "375px",
            margin: "10% auto",
          }}
        >
          <CardContent>
            <Grid
              container
              component="form"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                gap: "14px",
              }}
            >
              <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
                <Typography variant="h4">afetkargo</Typography>
              </StyledGrid>
  
              <StyledGrid item xs={12}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                  <LockIcon htmlColor="white" />
                </Avatar>
              </StyledGrid>
  
              <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
                <Typography variant="h6">Giriş Yap</Typography>
              </StyledGrid>
  
              <StyledGrid item xs={12}>
                <TextField
                  id="plateno"
                  name="plate"
                  label="Plaka No"
                  variant="outlined"
                  fullWidth
                />
              </StyledGrid>
  
              <StyledGrid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Şifre"
                  variant="outlined"
                  fullWidth
                />
              </StyledGrid>
  
              <StyledGrid item xs={12} style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  style={{ textTransform: "none" }}
                  type="submit"
                >
                  Giriş yap
                </Button>
              </StyledGrid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  };
  
  export default Login;
  