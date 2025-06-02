import { useEffect, useState } from "react";

export default function Home() {
    const [name, setName] = useState('');
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        const data = await window.api.receiveReservations();
        setReservations(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservation = { name, service, date, time };
        window.api.send('save-reservation', reservation);
        setName('');
        setService('');
        setDate('');
        setTime('');
        alert('rezerwacja zapisana!');
        fetchReservations();
    };

    return (
        <div className="center-containter">
            <div className="form-container">
                <h2>Dodaj rezerwację</h2>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Imię klienta" required /><br />
                    <input value={service} onChange={e => setService(e.target.value)} placeholder="Usługa" required /><br />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Data" required /><br />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} placeholder="Godzina" required /><br />
                    <button type="submit">Zapisz</button>
                </form>

                <hr />
                <h3>Lista rezerwacji:</h3>
                <ul>
                    {reservations.map((r, i) => (
                        <li key={i}>
                            <strong>{r.name}</strong> - {r.service} - {r.date} - {r.time}
                        </li>
                    ))}
                </ul>
            </div> 
        </div>
    );
}