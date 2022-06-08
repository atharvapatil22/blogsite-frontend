import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";

function ProtectedRoute({
  userAuthenticated,
  formMessage,
  setAuthFormVisible,
  setAuthFormMessage,
}) {
  useEffect(() => {
    if (!userAuthenticated) {
      setAuthFormVisible(true);
      setAuthFormMessage(formMessage);
    }
  }, []);

  if (!userAuthenticated) {
    return <></>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
