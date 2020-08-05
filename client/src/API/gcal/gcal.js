

const CALENDAR_ID = 'philgoodmusic@gmail.com'
const API_KEY = 'AIzaSyBHb1rrQXma9QRKh0p9XRxiqwomn5VWl_M'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`


export const getEvents = async () => {

    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let json = await res.json()
    let data = json.items.map(event => (
        {
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
        }
    ));
    return data;
}