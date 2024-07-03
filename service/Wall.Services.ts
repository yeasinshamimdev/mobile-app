import { ApiService } from "./api";

class WallService extends ApiService {
  constructor() {
    super();
  }

  getAllWall = async (token: string) => {
    return await this.base.get("/wall/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getSingleWall = async (id: string, token: string) => {
    return await this.base.get(`/wall/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  singleWallContent = async (id: string, token: string) => {
    return await this.base.get(`/wall/${id}/content`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // deleteWall = async (id: string) => {
  //   return await this.base.delete(`/wall/remove/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // };
}

export namespace WallServiceWrapper {
  const wallService = new WallService();

  export const getAllWall = async (token: string) => {
    return (await wallService.getAllWall(token)).data;
  };

  // export const deleteWall = async (id: string) => {
  //   return (await wallService.deleteWall(id)).data;
  // };

  export const getSingleWall = async (id: string, token: string) => {
    return (await wallService.getSingleWall(id, token)).data;
  };

  export const getSingleWallContent = async (id: string, token: string) => {
    return (await wallService.singleWallContent(id, token)).data;
  };
}
