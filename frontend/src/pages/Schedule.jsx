import { useEffect, useState } from "react";

const Schedule = () => {
    const [reservations, setReservations] = useState([]);
    console.log(reservations);
    
    useEffect(() => {
        const fetch = async () => {
            const data = await window.api.receiveReservations();
            setReservations(Array.isArray(data) ? data : []);
        };
        fetch();
    }, []);

    return (
        <div className="Terminarz">
            <ul>
                {reservations.map((r, i) => (
                    <li key={i}>{r.name} - {r.service} - {r.date} {r.time}</li>
                ))}
            </ul>
        </div>
    );
}

export default Schedule;