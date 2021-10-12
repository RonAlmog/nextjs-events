import { getEventById, getAllEvents } from "../../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../../components/events/event-detail/event-summary";
import EventLogistics from "../../../components/events/event-detail/event-logistics";
import EventContent from "../../../components/events/event-detail/event-content";
import ErrorAlert from "../../../ui/error-alert";
const Index = (props) => {
  const event = props.event;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found...</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default Index;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return { props: { event } };
}

export async function getStaticPaths() {
  const allevents = await getAllEvents();
  const paths = allevents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}
