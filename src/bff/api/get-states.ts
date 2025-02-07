import { getUrl } from "../shared/lib";
import { AppStateData } from "../shared/model";

export const getStates = ():Promise<AppStateData[]> =>
  fetch(getUrl('/states')).then((loadedStates) => loadedStates.json());
