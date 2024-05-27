import { useParams } from "react-router-dom";

const HomePage = () => {
  const {user_id} = useParams()
  console.log('id from homepage',user_id)
  return <div>{user_id}</div>;
};

export default HomePage;
