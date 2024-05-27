import LoggedInNav from "../layouts/LoggedInNav";
import { Navigate, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { setProgress } from "../../features/slices/loadingSlice";
import { TokenValidation } from "../../utils/utils";
import { Roles } from "../../types/commons";
import { NavigateToRoute } from "../../types/enums";

function ProtectedRoute() {
  const { progress } = useSelector((store: RootState) => store.topLoading);
  const dispatch = useDispatch();

  const tokenValid: { role: Roles; isExpired: boolean } = TokenValidation();
  return (
    <>
      <LoadingBar
        color="#E1701A"
        progress={progress}
        height={4}
        shadow={true}
        onLoaderFinished={() => {
          dispatch(setProgress(100));
        }}
      />

      {tokenValid.isExpired ? (
        <Navigate to={NavigateToRoute.HOME} />
      ) : (
        <>
          <LoggedInNav />
          <Outlet />
        </>
      )}
    </>
  );
}

export default ProtectedRoute;
