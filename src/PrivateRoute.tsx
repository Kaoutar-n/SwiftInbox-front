import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./authUtils";
import { BeatLoader } from "react-spinners";
import "./Login.css";

interface PrivateRouteProps {
  path: string;
  element: JSX.Element;
}

function PrivateRoute({ path, element }: PrivateRouteProps): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setAuthenticated(authenticated);
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate(path);
    }
  }, [authenticated, navigate, path]); 

  if (authenticated === null) {
    return (
      <div className="snipper">
        {loading ? (
          <BeatLoader
            color={"#36d7b7"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
}

export default PrivateRoute;
