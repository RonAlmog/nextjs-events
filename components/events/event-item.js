import Link from "next/link";
import styles from "./event-item.module.css";
const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const niceDate = new Date(date).toLocaleDateString("en-US");
  const niceAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <img src={"/" + image} alt={title} width="400"></img>

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>Title</h2>
          <div className={styles.date}>
            <time>{niceDate}</time>
          </div>
          <div className={styles.address}>
            <address>{niceAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
