import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthticated) navigate("/");
    },
    [isAuthticated, navigate]
  );

  return isAuthticated ? children : null;
}

export default ProtectedRoute;
