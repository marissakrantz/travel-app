import React from "react";
import { Link } from 'react-router-dom';
import { Box, Stack, Image, Button } from "@chakra-ui/react"
import plane from '../images/plane.png'

import Auth from '../../utils/auth';

const Header = () => {
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <header className="header logOutCon">
                        <Stack
                            direction="row">
                            <Image className="bg" src={plane}
                                alt="world map"
                            />
                            <Box>
                                <br /> <br /> <br /> <br /> <br /> <br /> <br />
                                <p className="headerFont">~ Not all who wander are lost </p>
                            </Box>
                        </Stack>
                    </header>
                    <Stack
                        direction="row">
                        <Box >
                            <Button className="logOutBtn" variant="solid"><Link to="/">Home</Link></Button>
                        </Box>
                        <Box >
                            <a href="/" onClick={() => Auth.logout()}>
                                <Button className="logOutBtn" variant="solid">Logout</Button>
                            </a>
                        </Box>
                    </Stack>
                </>
            ) : (
                <p></p>
            )}
        </div>
    )
};

export default Header;