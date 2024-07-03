import { IAllSortBox } from "./sortbox.type";

export interface ICreateWallPayload {
  max_users: number;
  name: string;
  sort_boxes: string[];
}
export interface ICreatedWall {
  wall_id: string;
}
export interface IDeletedWallResponse extends ICreatedWall {
  status: string;
}

export interface ISortBox {
  is_sorted: boolean;
  sort_id: string;
  is_empty: boolean;
}
export interface IAllWalls {
  created_at: string;
  id: string;
  max_users: number;
  name: string;
  sort_boxes: ISortBox[];
  status: true;
}

export interface ISingleWall {
  being_sorted: number;
  started_at: string | null;
  empty: number;
  items: [
    {
      item_id: string;
      sku: string;
      name: string;
      order: string;
      quantity_sorted: number;
      quantity: number;
      everlab_id: string;
      image: string;
    }
  ];
  max_users: number;
  name: string;
  ready_to_ship: number;
  slots: number;
  sortboxes: [
    {
      is_sorted: true;
      sortbox_id: string;
      sorted_items: number;
      total_items: number;
      identifier: string;
    }
  ];
}

export interface ISingleWallContent {
  max_users: number;
  sortboxes: [
    {
      identifier: string;
      size: string;
      sortbox_id: string;
    }
  ];
  wall_name: string;
}

export interface IUpdateWallPayload {
  identifier: string;
  max_users: number;
  sortboxes: string[];
}

export interface IUseWallStore {
  allWalls: IAllWalls[];
  isAllWallsLoading: boolean;
  allWallErr: string | null;
  getAllWalls: (token: string) => Promise<void>;

  singleWall: ISingleWall | null;
  isSingleWallLoading: boolean;
  singleWallErr: string | null;
  getSingleWall: (id: string, token: string) => Promise<void>;

  // deletedWallResponse: IDeletedWallResponse | null;
  // isDeletingWall: boolean;
  // isDeletingErr: string | null;
  // deleteWall: (id: string) => Promise<void>;

  singleWallContent: ISingleWallContent | null;
  isSingleWallContentLoading: boolean;
  singleWallContentErr: string | null;
  getSingleWallContent: (id: string, token: string) => void;

  //clean up fn
  cleanAssignedSortBox: () => void;
  cleanSingleWallContent: () => void;
}
