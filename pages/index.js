import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../data/dummy-data";
import EventList from "../components/events/event-list";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div className={styles.container}>
      <h1>Home page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}
