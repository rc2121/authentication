import React from "react";
import "./header.css";
const Header = (props) => {
  const { history } = props;
  const id = localStorage.getItem("id");
  const handleLogout = () => {
    localStorage.removeItem("id");
    history.push("/sign-in");
  };
  return (
    <>
      {id && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/users">
            User Authentication
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline">
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
