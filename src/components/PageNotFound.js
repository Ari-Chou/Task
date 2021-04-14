import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page not found!</h1>
      <Link to="/" className="btn btn-danger btn-lg">
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
