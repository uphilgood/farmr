import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { getEvents } from '../API/gcal/gcal'
import './react-big-calendar.css'

const GoogleCalendar = () => {
    const localizer = momentLocalizer(moment)
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        getEvents().then(events => setEvents(events))
    }, []);

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) return setEvents([...events, {start, end, title}])
    };

    return (
        <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        />
    )
}

export default GoogleCalendar;