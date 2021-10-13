import { getEventById, getFeaturedEvents } from "../../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../../components/events/event-detail/event-summary";
import EventLogistics from "../../../components/events/event-detail/event-logistics";
import EventContent from "../../../components/events/event-detail/event-content";
import ErrorAlert from "../../../ui/error-alert";
const Index = (props) => {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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
  return { props: { event }, revalidate: 300 };
}

export async function getStaticPaths() {
  const allevents = await getFeaturedEvents();
  const paths = allevents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // fallback: false, we pre generte everything. whatever is not here is 404.
    fallback: true, // true: there are more pages than what we pre generate. they will be generated in real time.
  };
}
