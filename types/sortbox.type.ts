export interface ISortErr {
  identifier: string;
  put_light_address: string;
  ship_light_address: string;
}

export interface IDeleteBulkSortBox {
  ids: string[];
}

export interface ICreateSortPayload {
  identifier: string;
  size: "small" | "medium" | "large";
  put_light_address: string;
  ship_light_address: string;
}
export interface ISingleSortBox extends ICreateSortPayload {}
export interface IUpdateSingleSortBox extends ICreateSortPayload {
  id: string;
}

export interface ICreatedSortBox {
  id: string;
  identifier: string;
  size: string;
}

export interface IAllSortBox {
  created_at: string;
  id: string;
  identifier: string;
  size: string;
}

export interface IAllSortBoxApiRes {
  data: IAllSortBox[];
  total_pages: number;
}

export interface ISortBoxSuggest {
  order_id: string;
  wall_id: string;
}
export interface ISuggestedSortBox {
  created_at: string;
  id: string;
  identifier: string;
  size: string;
}

export interface IConfirmSortBoxPayload {
  item_id: string;
  order_Id: string;
  sku: string;
  sortbox_id: string;
  wall_id: string;
  everlab_id: string;
}

export interface ISortBoxItems {
  item_id: string;
  label: string;
  order_number: string;
  quantity: number;
  sku: string;
}

export interface IOffSortBoxLightPayload {
  order_id: string;
  wall_id: string;
}

export interface ISortBoxContent {
  sortbox_identifier: string;
  order: string;
  confirmation_date: string | null;
  ready_for_shipping: string | null;
  items_in_sortbox: [
    {
      item: string;
      label: string;
      required: number;
      sorted: number;
      remaining: number;
    }
  ];
}

export interface IEmptySortBoxList {
  identifier: string;
  size: string;
  sortbox_id: string;
}
export interface IUseSortBoxStore {
  sortBoxSuggestLoading: boolean;
  sortBoxSuggestErr: string | null;
  sortBoxData: ISuggestedSortBox | null;
  sortBoxSuggest: (payload: ISortBoxSuggest, token: string) => Promise<void>;

  isOffSortLight: boolean;
  isClosingLight: boolean;
  isOffErr: string | null;
  offSortBoxLight: (
    payload: IOffSortBoxLightPayload,
    token: string
  ) => Promise<void>;

  confirmedSortation: boolean;
  isConfirmLoading: boolean;
  isConfirmErr: string | null;
  confirmSortBox: (
    payload: IConfirmSortBoxPayload,
    token: string
  ) => Promise<void>;

  updateCreateSortBoxState: () => void;
}
