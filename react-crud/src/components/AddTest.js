import React, { useState } from "react";
import TestService from "../services/TestService";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AddTest = () => {


    const initialTestState = {
        id: null,
        scenario: "",
        test: "",
        orig: "",
        agr: "",
        cat: "",
        n_ugts: "",
        objet_du_test: ""
    };

    const [teste, setTest] = useState(initialTestState);
    const [submitted, setSubmitted] = useState(false);

    
    const handleInputChange = event => {
        const { name, value } = event.target; 
        setTest({ ...teste, [name]: value });
    };
    
    const saveTest = () => {

        var datateste = {
            scenario: teste.scenario,
            test: teste.test,
            orig: teste.orig,
            agr: teste.agr,
            cat: teste.cat,
            n_ugts: teste.n_ugts,
            objet_du_test: teste.objet_du_test
        };

    
        TestService.create(datateste)
        .then(response => {
            setTest({
                id: response.data.id,
                scenario: response.data.scenario,
                test: response.data.test,
                orig: response.data.orig,
                agr: response.data.agr,
                cat: response.data.cat,
                n_ugts: response.data.n_ugts,
                objet_du_test: response.data.objet_du_test
            });

            setSubmitted(true);
            console.log(datateste);
        })
        .catch(e =>{
            console.log(e)
        });
    };
    
    const newTest = () => {
        setTest(initialTestState);
        setSubmitted(false);
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Ajouter Test
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={30} sm={4}>
                  <TextField
                    name="scenario"
                    required
                    fullWidth
                    id="scenario"
                    label="Scenario"
                    value={teste.scenario}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={30} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="test"
                    label="Test"
                    name="test"
                    value={teste.test}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={30} sm={4}>
                  <TextField
                    fullWidth
                    id="orig"
                    label="Orig"
                    name="orig"
                    value={teste.orig}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={30} sm={4}>
                  <TextField
                    fullWidth
                    id="cat"
                    label="Cat"
                    name="cat"
                    onChange={handleInputChange}
                    value={teste.cat}
                  />
                </Grid>
                <Grid item xs={30} sm={4}>
                  <TextField
                    fullWidth
                    id="agr"
                    label="Agr"
                    name="agr"
                    onChange={handleInputChange}
                    value={teste.agr}
                  />
                </Grid>
                <Grid item xs={30} sm={4}>
                  <TextField
                    fullWidth
                    id="n_ugts"
                    label="N° UGTS"
                    name="n_ugts"
                    onChange={handleInputChange}
                    value={teste.n_ugts}
                  />
                </Grid>
                <Grid item xs={30}>
                  <TextField
                    fullWidth
                    name="objet_du_test"
                    label="Objet du Test"
                    type="text"
                    id="objet_du_test"
                    onChange={handleInputChange}
                    value={teste.objet_du_test}
                  />
                </Grid>
              </Grid>
              <Button 
                
                onClick={saveTest}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
};

export default AddTest;





