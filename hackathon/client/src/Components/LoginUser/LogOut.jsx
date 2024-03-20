import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/user/sellerSlice";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.get("http://localhost:8000/api/auth/signOut");
      const data = response.data;

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  handleSignOut();

  return null;
};

export default LogOut;
