import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../data/dummy-data";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../results-title";
import { Fragment } from "react";
import Button from "../../../ui/button";
import ErrorAlert from "../../../ui/error-alert";
const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log("filterData", filterData);
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  const year = +filterData[0];
  const month = +filterData[1];
  if (isNaN(year) || isNaN(month)) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid Data!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const events = getFilteredEvents({ year, month });
  if (!events || events.length == 0) {
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
  const date = new Date(year, month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
};

export default FilteredEventsPage;
