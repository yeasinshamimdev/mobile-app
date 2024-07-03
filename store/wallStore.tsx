import { WallServiceWrapper } from "@/service/Wall.Services";
import { IUseWallStore } from "@/types/wall.types";
import { AxiosError } from "axios";
import { create } from "zustand";

export const useWallStore = create<IUseWallStore>((set) => ({
  allWalls: [],
  isAllWallsLoading: false,
  allWallErr: null,
  async getAllWalls(token) {
    try {
      set({
        allWalls: [],
        isAllWallsLoading: true,
        allWallErr: null,
      });
      const apiRes = await WallServiceWrapper.getAllWall(token); 
      set({
        allWalls: apiRes,
        isAllWallsLoading: false,
        allWallErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        allWalls: [],
        isAllWallsLoading: false,
        allWallErr:
          error?.response?.data?.message || "Failed to fetch wall list",
      });
    }
  },

  singleWall: null,
  isSingleWallLoading: false,
  singleWallErr: null,
  getSingleWall: async (id, token) => {
    try {
      set({
        singleWall: null,
        isSingleWallLoading: true,
        singleWallErr: null,
      });
      const apiRes = await WallServiceWrapper.getSingleWall(id, token);
      set({
        singleWall: apiRes,
        isSingleWallLoading: false,
        singleWallErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        singleWall: null,
        isSingleWallLoading: false,
        singleWallErr:
          error?.response?.data?.message || "Failed to fetch single wall",
      });
    }
  },

  // deletedWallResponse: null,
  // isDeletingWall: false,
  // isDeletingErr: null,
  // async deleteWall(id: string) {
  //   try {
  //     set({
  //       deletedWallResponse: null,
  //       isDeletingWall: true,
  //       isDeletingErr: null,
  //     });
  //     const apiRes = await WallServiceWrapper.deleteWall(id);
  //     set({
  //       deletedWallResponse: apiRes,
  //       isDeletingWall: false,
  //       isDeletingErr: null,
  //     });
  //   } catch (error: AxiosError | any) {
  //     set({
  //       deletedWallResponse: null,
  //       isDeletingWall: true,
  //       isDeletingErr:
  //         error?.response?.data?.message || "Failed to delete wall",
  //     });
  //   }
  // },

  singleWallContent: null,
  isSingleWallContentLoading: false,
  singleWallContentErr: null,
  getSingleWallContent: async (id: string, token) => {
    try {
      set({
        singleWallContent: null,
        isSingleWallContentLoading: true,
        singleWallContentErr: null,
      });
      const apiRes = await WallServiceWrapper.getSingleWallContent(id, token);
      set({
        singleWallContent: apiRes,
        isSingleWallContentLoading: false,
        singleWallContentErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        singleWallContent: null,
        isSingleWallContentLoading: false,
        singleWallContentErr:
          error?.response?.data?.message || "Failed to get single wall data",
      });
    }
  },

  //clean up fn
  cleanAssignedSortBox() {
    set({});
  },
  cleanSingleWallContent() {
    set({ singleWallContent: null });
  },
}));
