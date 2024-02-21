import React from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";

export default function Calendar() {
	const [date, setDate] = useState(null);
	return <PrimeCalendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />;
}
