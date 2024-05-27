import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoginForm from "../custom/Forms/LoginForm";
import PHModal from "../custom/Modals/PHModal";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

function Navbar() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.modal);
  return (
    <nav className="navbar py-0">
      <div className="container-fluid">
        <div className="flex justify-between w-full lg:w-1/2 mx-auto">
          <div className="self-center">
            <img
              src="./src/assets/icon_name_logo.svg"
              alt="no svg found"
              className="w-[60%] md:w-2/3"
            />
          </div>
          <div className="self-center">
            <Button
              variant="outlined"
              style={{
                backgroundColor: "#e1701a",
                color: "white",
                borderColor: "#e1701a",
                borderRadius: "1rem",
                padding: "8px 20px",
                textTransform: "none",
                cursor: "pointer",
                margin: "0px 4px",
              }}
              onClick={() => {
                dispatch(openModal());
              }}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <PHModal
        isOpen={isOpen}
        style={{ width: "380px" }}
        headingText="Login"
        onClose={() => {
          dispatch(closeModal());
        }}
        component={<LoginForm />}
      />
    </nav>
  );
}

export default Navbar;
