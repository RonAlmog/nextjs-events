import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../helpers/api-util";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../../ui/button";
import ErrorAlert from "../../../ui/error-alert";
import useSWR from "swr";

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  console.log("filterData", filterData);

  const { data, error } = useSWR(
    "https://events-64140-default-rtdb.firebaseio.com/events.json"
  );
  console.log("data", data);
  useEffect(() => {
    if (data) {
      console.log("data", data);
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      console.log("new events", events);
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }
  const year = +filterData[0];
  const month = +filterData[1];

  if (isNaN(year) || isNaN(month) || error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Events not found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  // const filteredEvents = props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events selected!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(year, month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </Fragment>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const year = +filterData[0];
  const month = +filterData[1];
  if (isNaN(year) || isNaN(month)) {
    return {
      hasError: true,
    };
  }
  const events = await getFilteredEvents({ year, month });
  return {
    props: {
      events,
      date: {
        year,
        month,
      },
    },
  };
}
