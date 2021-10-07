import Button from "../../ui/button";
import styles from "./event-item.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrorRightIcon from "../icons/arrow-right-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
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
            <DateIcon />
            <time>{niceDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{niceAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
