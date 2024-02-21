import React, { useEffect, useState } from "react";
import Text from "@/components/Text/Text";
import Feed from "@/app/dashboard/Feed";
import Match from "@/app/dashboard/Match";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";

export default function DashboardPage() {
	const [date, setDate] = useState<any>();

	useEffect(() => {
		console.log(date?.format("YYYY-MM-DD"));
	}, [date]);

	return (
		<div className="min-h-full grid grid-cols-2 gap-4 bg-transparent">
			<div className="rounded-lg col-span-1 h-full bg-white px-8 py-4">
				<Text variant="h4" color="default">
					News feed
				</Text>
				<div className="mt-6 flex flex-col gap-12">
					<Feed />
					<Feed />
					<Feed />
				</div>
			</div>
			<div className="col-span-1 h-full flex flex-col gap-4">
				<div className="rounded-lg h-1/2 bg-white px-8 py-4">
					<Text variant="h4" color="default">
						Upcoming matches
					</Text>
					<div className="mt-6 flex flex-col gap-2">
						<Match type="practice" />
						<Match type="competition" />
						<Match type="practice" />
					</div>
				</div>
				<div className="rounded-lg h-1/2 bg-white px-8 py-4">
					<Text variant="h4" color="default">
						Calendar
					</Text>
					<Calendar fullscreen={false} onSelect={setDate} />
				</div>
			</div>
		</div>
	);
}
