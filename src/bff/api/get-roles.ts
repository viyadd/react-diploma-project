import { getUrl } from "../utils";

export const getRoles = () =>
  fetch(getUrl('/roles')).then((loadedRoles) => loadedRoles.json());
