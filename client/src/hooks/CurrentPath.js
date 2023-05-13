import { matchRoutes, useLocation } from "react-router-dom";

const useCurrentPath = (paths) => {
  const location = useLocation();
  const result = matchRoutes(paths, location);
  if (result) return result[0].route.path;
  return null;
};

export default useCurrentPath;
