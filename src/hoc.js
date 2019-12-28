import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const Ifo = () => (
  <div>
    <h1>Ifo</h1>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is only for admins</p>}
      <p>This is private info pls don't share</p>
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = Comp => {
  const info = "Big opportunity for growth";
  return props => (
    <div>
      {props.isAuthenticated && <Comp {...props} />}
      {!props.isAuthenticated && <p>Please login</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

console.log("ReactDOM");

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="These are the details" />,
  document.getElementById("app")
);
