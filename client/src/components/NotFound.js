import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <article className="not-found-container">
      <section className="not-found">
        <h1>404</h1>
        <p>Sorry, not found!</p>
        <Link className="btn" to="/">
          Back home
        </Link>
      </section>
    </article>
  );
};

export default NotFound;
