import { Link } from "react-router-dom";
import Users from "./Userscomponent";

// This is a comment to check if I can push to github
// second attempt to push on a branch
const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
