import { setProgress } from "../../features/slices/loadingSlice";
import { useDispatch } from "react-redux";

function UserProfile() {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(setProgress(50));
  }, 3000);
  return <div>UserProfile</div>;
}

export default UserProfile;
