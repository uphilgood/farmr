import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import Button from '@material-ui/core/Button';
import moment from 'moment'
import { getEvents } from '../API/gcal/gcal'
import './react-big-calendar.css'

const GoogleCalendar = () => {
    const localizer = momentLocalizer(moment)
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        console.log('today is ', moment())
        getEvents().then(events => setEvents(events))
    }, []);

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) return setEvents([...events, {start, end, title}])
    };

    console.log('events', events)

    return (

        <Calendar
        selectable
        localizer={localizer}
        events={events}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
      />


    )
}

export default GoogleCalendar;

