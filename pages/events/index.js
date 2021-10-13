import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list.js";
import EventsSearch from "./events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

const AllEvents = (props) => {
  const router = useRouter();
  const { events } = props;
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEvents;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60,
  };
}
