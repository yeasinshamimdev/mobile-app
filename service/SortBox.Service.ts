import {
  IConfirmSortBoxPayload,
  IOffSortBoxLightPayload,
  ISortBoxSuggest,
} from "@/types/sortbox.type";
import { ApiService } from "./api";

class SortBoxService extends ApiService {
  constructor() {
    super();
  }

  sortBoxSuggest = async (payload: ISortBoxSuggest, token: string) => {
    return await this.base.post("/sortbox/suggest", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  confirmSortation = async (payload: IConfirmSortBoxPayload, token: string) => {
    return await this.base.post("/sortbox/assign/item", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  offSortBoxLight = async (payload: IOffSortBoxLightPayload, token: string) => {
    return await this.base.post("/sortbox/cancel/assign", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

export namespace SortBoxServiceWrapper {
  const sortBoxService = new SortBoxService();

  export const sortBoxSuggest = async (
    payload: ISortBoxSuggest,
    token: string
  ) => {
    return (await sortBoxService.sortBoxSuggest(payload, token))?.data;
  };

  export const confirmSortBox = async (
    payload: IConfirmSortBoxPayload,
    token: string
  ) => {
    return (await sortBoxService.confirmSortation(payload, token)).data;
  };

  export const offSortBoxLight = async (
    payload: IOffSortBoxLightPayload,
    token: string
  ) => {
    return (await sortBoxService.offSortBoxLight(payload, token)).data;
  };
}
