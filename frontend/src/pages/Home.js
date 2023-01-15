import React, { useState } from 'react';
import { Box, Typography, Slide, Button, Snackbar, Alert, AlertTitle } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { CustomTextField } from '../reuseable';

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

function Home(props) {

    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [open, setOpen] = useState(false);
    const [eopen, setEopen] = useState(false);
    const navigate = useNavigate();

    const handlejoin = () => {
        if (!roomId || !name) {
            setEopen(true);
            return;
        }
        setOpen(true);
        navigate(`/codespace/${roomId}`, {
            state: {
                roomId,
                name,
            }
        });
    }

    const handleKey = (e) => {
        if (e.code === 'Enter') {
            handlejoin();
        }
    }

    const generateSpace = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
    }

    return (
        <>
            <Snackbar
                open={eopen}
                onClose={() => setEopen(false)}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3500}
            >

                <Alert onClose={() => setEopen(false)} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle>All fields Required</AlertTitle>
                    One or more fields missing.
                </Alert>
            </Snackbar>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={2500}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    <AlertTitle>Space Created</AlertTitle>
                    You will now be redirected to space.
                </Alert>

            </Snackbar>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            width: "25vw",
                            backgroundColor: "background.paper",
                            // borderRadius:1,
                            display: "flex",
                            flexDirection: "column",
                            p: 3,
                            boxShadow: "12px 12px 0px 3px #B4FE98"
                        }}>
                        <Typography variant="h1" sx={{ fontSize: 50, fontWeight: 700, mb: 3 }}>
                            CodeCollab.
                        </Typography>
                        <Box>
                            {login && <Login setLogin={setLogin} />}
                            {register && <Register setRegister={setRegister} />}
                            {!login && !register && (
                                <>
                                    <Typography variant="h2" sx={{ fontSize: 25, fontWeight: 700, mb: 2, width: "90%" }}>
                                        Join a space.
                                    </Typography>
                                    <Box>
                                        <CustomTextField
                                            autoFocus
                                            name="spaceid"
                                            placeholder="Paste Invite ID"
                                            sx={{ width: "500px", maxWidth: "100%", mb: 1 }}
                                            value={roomId}
                                            onKeyUp={handleKey}
                                            onChange={(e) => setRoomId(e.target.value)}
                                        />

                                        <CustomTextField
                                            name="name"
                                            placeholder="Enter name"
                                            sx={{ width: "500px", maxWidth: "100%", mb: 2 }}
                                            value={name}
                                            onKeyUp={handleKey}
                                            onChange={(e) => setName(e.target.value)}
                                        />


                                        <Button variant="contained" sx={{ height: "43px", display: "block" }} onClick={handlejoin}>Join</Button>

                                        <Box sx={{ mt: 5 }}>
                                            <Typography variant="h2" sx={{ fontSize: 25, fontWeight: 700, mb: 2, width: "90%" }}>
                                                Create a space.
                                            </Typography>
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>

                                                <Button variant="contained" sx={{ height: "50px", mr: 5 }} onClick={() => { setLogin(true); setRegister(false); }}>Login</Button>
                                                <Button variant="contained" sx={{ height: "50px", mr: 5 }} onClick={() => { setLogin(false); setRegister(true); }}>Signup</Button>
                                                <Button variant="contained" sx={{ height: "50px" }} onClick={generateSpace}>Generate Space</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            )}

                        </Box>

                    </Box>
                </Slide>




            </Box>

            {/*Footer*/}
            <Box sx={{ position: "fixed", bottom: "0", width: "100vw" }}>
                <Typography sx={{ textAlign: "center" }}>
                    Author
                </Typography>
            </Box>
        </>

    );
}

export default Home;