import React, {useEffect, useState} from "react";
import {Typography, Grid} from "@material-ui/core";
import Payments from './Payments'
import {Elements, StripeProvider} from "react-stripe-elements";

const Landing = () => {

    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        if (window.Stripe) {
            setStripe(window.Stripe(process.env.REACT_APP_STRIPE_KEY));
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                setStripe(window.Stripe(process.env.REACT_APP_STRIPE_KEY));
            });
        }
    }, []);

    return <div style={{textAlign: 'center', padding: '50px 20px'}}>
        <Typography variant={'h1'}>Emaily!</Typography>
        <p>Collect feedback from your users</p>
        <Grid container spacing={16} style={{margin: '40px 0'}}>
            <Grid item xs={4}/>
            <Grid item xs={4}>
                <StripeProvider stripe={stripe}>
                    <Elements>
                        <Payments/>
                    </Elements>
                </StripeProvider>
            </Grid>
            <Grid item xs={4}/>
        </Grid>
    </div>
};

export default Landing;