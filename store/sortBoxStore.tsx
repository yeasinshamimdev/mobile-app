import { SortBoxServiceWrapper } from "@/service/SortBox.Service";
import { IUseSortBoxStore, ISortBoxSuggest } from "@/types/sortbox.type";
import { AxiosError } from "axios";
import { create } from "zustand";

export const useSortBoxStore = create<IUseSortBoxStore>((set) => ({
  //sort box suggestion
  sortBoxSuggestLoading: false,
  sortBoxSuggestErr: null,
  sortBoxData: null,
  async sortBoxSuggest(payload: ISortBoxSuggest, token: string) {
    try {
      set({
        sortBoxData: null,
        sortBoxSuggestLoading: true,
        sortBoxSuggestErr: null,
      });
      const apiRes =
        this.sortBoxData !== null &&
        (await SortBoxServiceWrapper.sortBoxSuggest(payload, token));

      set({
        sortBoxData: apiRes?.sortbox,
        sortBoxSuggestLoading: false,
        sortBoxSuggestErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        sortBoxData: null,
        sortBoxSuggestLoading: false,
        sortBoxSuggestErr:
          error?.response?.data?.message || "Failed to get suggested sort box",
      });
    }
  },

  confirmedSortation: false,
  isConfirmLoading: false,
  isConfirmErr: null,
  async confirmSortBox(payload, token) {
    try {
      set({
        confirmedSortation: false,
        isConfirmLoading: true,
        isConfirmErr: null,
      });
      const apiRes = await SortBoxServiceWrapper.confirmSortBox(payload, token);

      set({
        confirmedSortation: apiRes?.success,
        isConfirmLoading: false,
        isConfirmErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        confirmedSortation: false,
        isConfirmLoading: false,
        isConfirmErr:
          error?.response?.data?.message || "Failed to confirm pick",
      });
    }
  },

  isOffSortLight: false,
  isClosingLight: false,
  isOffErr: null,
  offSortBoxLight: async (payload, token) => {
    try {
      set({
        isOffSortLight: false,
        isClosingLight: true,
        isOffErr: null,
      });
      const apiRes = await SortBoxServiceWrapper.offSortBoxLight(
        payload,
        token
      );
      set({
        isOffSortLight: apiRes?.success,
        isClosingLight: false,
        isOffErr: null,
      });
    } catch (error: AxiosError | any) {
      set({
        isOffSortLight: false,
        isClosingLight: false,
        isOffErr: error?.response?.data?.message,
      });
    }
  },

  //cleanup function
  updateCreateSortBoxState() {
    set({
      sortBoxSuggestErr: null,
      isConfirmErr: null,
      isOffSortLight: false,
      isOffErr: null,
    });
  },
}));
