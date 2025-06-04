import { useEffect, useState } from "react";
import WeeklyCalendar from "../components/WeeklyCalendar";

const Schedule = () => {
    const [reservations, setReservations] = useState([]);

    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
    
    useEffect(() => {
        const fetch = async () => {
            const data = await window.api.receiveReservations();
            setReservations(Array.isArray(data) ? data : []);
        };
        fetch();
    }, []);

    const grouped = sortedReservations.reduce((acc, r) => {
        const dateKey = r.date;
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(r);
        return acc;
    }, {});

    return (
        // <div className="Terminarz">
        //     {Object.keys(grouped).map(date => (
        //         <div key={date}>
        //             <h3>{new Date(date).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
        //             <ul>
        //                 {grouped[date].map((r, i) => {
        //                     const date = new Date(`${r.date}T${r.time}`);
        //                     const day = date.toLocaleDateString('pl-PL', { weekday: 'long' });
        //                     const hour = date.getHours().toString().padStart(2, '0') + ':00';

        //                     // console.log(`${r.name} - ${day} o ${hour}`);

        //                     return (
        //                        <li key={i}>
        //                         <strong>{r.name}</strong> - {r.service} o {hour}
        //                     </li>  
        //                     );
                           
        //                     })}
        //             </ul>
        //         </div>
        //     ))}
        //     

        // </div>
        <WeeklyCalendar reservations={reservations} />
    );
}

export default Schedule;