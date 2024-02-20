import React from "react";
import Section from "@/components/Section";
import Text from "@/components/Text/Text";

export default function DashboardPage() {
    return (
        <div className="min-h-full grid grid-cols-2 gap-4 bg-transparent">
            <div className="rounded-lg col-span-1 h-full bg-white px-4 py-2">
                <Text variant="h4" color="default">News feed</Text>

            </div>
            <div className="col-span-1 h-full flex flex-col gap-4">
                <div className="rounded-lg h-1/2 bg-white px-4 py-2">
                    <Text variant="h4" color="default">Upcoming matches</Text>
                </div>
                <div className="rounded-lg h-1/2 bg-white px-4 py-2">
                    <Text variant="h4" color="default">Calendar</Text>
                </div>
            </div>
        </div>
    )
}