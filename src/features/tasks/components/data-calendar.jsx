import {
    format,
    getDay,
    parse,
    startOfWeek,
    addMonths,
    subMonths,
} from "date-fns"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { enUS } from "date-fns/locale"
import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./data-calendar.css"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"
const locales = {
    "en-US": enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})
const CustomToolbar = ({
    date,
    onNavigate,
    onView,
    view
}) => {
    const views = ["month", "week", "day"];

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => onNavigate("PREV")}
                    variant="secondary" size="icon" className="flex items-center">
                    <ChevronLeftIcon className="size-4" />
                </Button>
                <div className="flex items-center border border-input rounded-md px-3 py-2 h-8">
                    <CalendarIcon className="size-4 mr-2" />
                    <p className="text-sm">{format(date, "MMMM yyyy")}</p>
                </div>
                <Button onClick={() => onNavigate("NEXT")}
                    variant="secondary" size="icon" className="flex items-center">
                    <ChevronRightIcon className="size-4" />
                </Button>
            </div>

            {/* View buttons on the right */}
            <div className="flex gap-2">
                {views.map((viewName) => (
                    <Button
                        key={viewName}
                        onClick={() => onView(viewName)}
                        variant={view === viewName ? "default" : "outline"}
                        size="sm"
                    >
                        {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                    </Button>
                ))}
            </div>
        </div>
    )
}
export const DataCalendar = ({ data }) => {
    const [view, setView] = useState("month");
    const [value, setValue] = useState(
        data.length > 0 ? new Date(data[0].dueDate) : new Date()
    )
    const events = data.map((task) => ({
        start: new Date(task.startDate),
        end: new Date(task.dueDate),
        title: task.name,
        project: task.project,
        assignee: task.assignee,
        status: task.status,
        id: task.id,
    }))

    const handleNavigate = (action) => {
        if (action === "PREV") setValue(subMonths(value, 1))
        else if (action === "NEXT") setValue(addMonths(value, 1))
        else if (action === "TODAY") setValue(new Date())
    }

    const handleView = (newView) => {
        setView(newView);
    }

    return (
        <Calendar
            localizer={localizer}
            date={value}
            events={events}
            views={["month", "week", "day"]}
            view={view}
            onView={handleView}
            defaultView="month"
            toolbar
            startAccessor="start"
            endAccessor="end"
            showAllEvents
            className="h-full"
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            formats={{
                weekdayFormat: (date, culture, localizer) => localizer?.format(date, "EEE", culture) ?? "",
                dayFormat: (date, culture, localizer) => localizer?.format(date, "dd", culture) ?? "",
                dayHeaderFormat: (date, culture, localizer) => localizer?.format(date, "EEEE, MMMM dd", culture) ?? "",
                timeGutterFormat: () => "" // Remove time display
            }}
            step={60} // Set step to 60 minutes to remove half-hour lines
            timeslots={1} // Reduce number of time slots
            components={{
                eventWrapper: ({ event }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assignee={event.assignee}
                        project={event.project}
                        status={event.status}
                    />
                ),
                dayHeader: ({ date, localizer }) => (
                    <div className="rbc-day-header">
                        {localizer.format(date, "EEEE, MMMM dd")}
                    </div>
                ),
                toolbar: (toolbarProps) => (
                    <CustomToolbar
                        {...toolbarProps}
                        date={value}
                        onNavigate={handleNavigate}
                        onView={handleView}
                        view={view}
                    />
                )
            }}
        />
    )
}