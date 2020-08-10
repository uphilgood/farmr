import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { DateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import 'react-infinite-calendar/styles.css';
import { getEvents, postEvent } from '../API/gcal/gcal'
import Form from './Form'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


const DatePicker = (props) => {

    const [ disableDates, setDisableDates ] = useState([]);
    const [ newDate, setNewDate ] = useState(new Date());
    const [ emailData, setEmailData ] = useState({})
    const classes = useStyles();




    const lastWeek = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 7);

    useEffect(() => {
        getEvents().then(events => {
            const endDates = events.map(event => event.end);
            setDisableDates(endDates)
        })
    }, []);

    const handleSelect = (date) => {
        setNewDate(date._d)
    }

    const handleClick = async (date) => {
        let res = await fetch('http://localhost:4000/addEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: newDate,
                name: emailData.name,
                returnEmailAddress: emailData.email,
                method: emailData.method,
                body: emailData.body
              })
        
      });
      let json = await res.json();

      console.log('res json', json)
       
        props.close();

    }
    
    return (
        <div className={classes.paper}>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
              Please select your preferred date for delivery or pickup
              Our Team will be in touch with you to coordinate time
            </Typography>
            <DateTimePicker value={newDate} onChange={handleSelect} />
            <Form setEmailData={(data) => setEmailData(data) } />
            <Button onClick={() => handleClick(newDate)} variant="contained" color="primary">
                Select
            </Button>
        </div>
    );
}

export default DatePicker;