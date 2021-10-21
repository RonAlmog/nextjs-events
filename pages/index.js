import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

export default function HomePage(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS Course</title>
        <meta name="description" description="find lots of grate events" />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
