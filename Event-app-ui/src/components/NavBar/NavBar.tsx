import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Event App</a>

        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Create Event
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/allEvents" ? "active" : ""}`}
                to="/allEvents"
              >
                All Event
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/searchEvent" ? "active" : ""}`}
                to="/searchEvent"
              >
                Search Event
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
