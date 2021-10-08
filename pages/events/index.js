import { getAllEvents } from "../../data/dummy-data";
import EventList from "../../components/events/event-list.js";
import EventsSearch from "./events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

const AllEvents = () => {
  const router = useRouter();
  const allEvents = getAllEvents();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export default AllEvents;
