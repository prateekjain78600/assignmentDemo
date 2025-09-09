import React, { useState } from "react";
import { Typography,  Button, Paper, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/customTextfield";

export default function ShopifyIntegration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    accountName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/amazon/dashboard", { state: formData });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper elevation={4} sx={{ padding: 4, width: 400 ,borderRadius:"16px"}}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Amazon Account Integration
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12} mt={2}>
                <CustomTextField
                  label="Amazon Email"
                  name="email"
                  field="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={12}>
                <CustomTextField
                  label="Account Name"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={12}>
                <Button variant="contained" fullWidth type="submit">
                  Connect Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}
