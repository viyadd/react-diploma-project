import { getUrl } from "../shared/lib";

export const getRoles = () =>
  fetch(getUrl('/roles')).then((loadedRoles) => loadedRoles.json());
