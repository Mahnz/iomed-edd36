import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Card,
    CardContent,
    Button,
    Grid,
    TextField,
    IconButton,
    Paper,
    Box,
    Link
} from '@mui/material';
import styled from "styled-components";
import {KeyboardArrowUp} from '@mui/icons-material';

import ContactImg1 from "../style/contact-1.png";
import ContactImg2 from "../style/contact-2.png";
import ContactImg3 from "../style/contact-3.png";

const Wrapper = styled.section`
    width: 100%;
`;
const HeaderInfo = styled.div`
    padding: 70px 0 30px 0;
    @media (max-width: 860px) {
        text-align: center;
    }
`;
const Form = styled.form`
    padding: 70px 0 30px 0;

    input,
    textarea {
        width: 100%;
        background-color: transparent;
        border: 0px;
        outline: none;
        box-shadow: none;
        border-bottom: 1px solid #707070;
        height: 30px;
        margin-bottom: 30px;
    }

    textarea {
        min-height: 100px;
    }

    @media (max-width: 860px) {
        padding: 30px 0;
    }
`;
const ButtonInput = styled.input`
    border: 1px solid #7620ff;
    background-color: #7620ff;
    width: 100%;
    padding: 15px;
    outline: none;
    color: #fff;

    :hover {
        background-color: #580cd2;
        border: 1px solid #7620ff;
        color: #fff;
    }

    @media (max-width: 991px) {
        margin: 0 auto;
    }
`;
const ContactImgBox = styled.div`
    max-width: 180px;
    align-self: flex-end;
    margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
    @media (max-width: 991px) {
        width: 100%;
        margin-bottom: 50px;
    }
`;

export default function HomePage() {
    return (
        <div>
            {/* ... altre parti del codice ... */}

            <Header>
                <Typography variant="h2">Your Platform Name</Typography>
            </Header>

            <FeaturesContainer>
                {/* ... altre parti del codice ... */}
            </FeaturesContainer>

            <Container>
                <Grid container justifyContent="center">
                    <Card>
                        <CardContent>
                            {/* ... altre parti del codice ... */}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            {/* ... altre parti del codice ... */}
                        </CardContent>
                    </Card>
                </Grid>
            </Container>

            <Wrapper id="contact">
                <div className="lightBg">
                    <div className="container">
                        <HeaderInfo>
                            <h1 className="font40 extraBold">Contattaci</h1>
                        </HeaderInfo>
                        <div className="row" style={{paddingBottom: "30px"}}>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <Form>
                                    <label className="font13">Nome:</label>
                                    <input type="text" id="fname" name="fname" className="font20 extraBold"/>
                                    <label className="font13">Email:</label>
                                    <input type="text" id="email" name="email" className="font20 extraBold"/>
                                    <label className="font13">Oggetto:</label>
                                    <input type="text" id="subject" name="subject" className="font20 extraBold"/>
                                    <label className="font13">Suggerimenti:</label>
                                    <textarea rows="4" cols="50" type="text" id="message" name="message"
                                              className="font20 extraBold"/>
                                </Form>
                                <SumbitWrapper className="flex">
                                    <ButtonInput type="submit" value="Send Message" className="pointer animate radius8"
                                                 style={{maxWidth: "220px"}}/>
                                </SumbitWrapper>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
                                <div style={{width: "50%"}} className="flexNullCenter flexColumn">
                                    <ContactImgBox>
                                        <img src={ContactImg1} alt="office" className="radius6"/>
                                    </ContactImgBox>
                                    <ContactImgBox>
                                        <img src={ContactImg2} alt="office" className="radius6"/>
                                    </ContactImgBox>
                                </div>
                                <div style={{width: "50%"}}>
                                    <div style={{marginTop: "100px"}}>
                                        <img src={ContactImg3} alt="office" className="radius6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>

            {/* Footer */}
            <ScrollToTopButton>
                {/* ... altre parti del codice ... */}
            </ScrollToTopButton>
        </div>
    );
};
