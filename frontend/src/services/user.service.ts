import request from "./request";

class UserService {
  getDeleteById(accessToken: string, userId: undefined) {
    throw new Error("Method not implemented.");
  }
  ENDPOINT = "/api";

  public async getById(accessToken: string): Promise<any> {
    console.log("token", accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = `${this.ENDPOINT}/getUser`;
    return request.get<any>(url, config).then((res) => {
      // console.log("from user service", res);
      return res;
    });
  }

  public async updateById(
    accessToken: string,
    id?: Number,
    data?: any
  ): Promise<any> {
    console.log("token", accessToken);
    let endObj: any = "";
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = `${this.ENDPOINT}/users/${id}`;
    console.log({ url });

    await request.patch<any>(url, data, config).then((res) => {
      console.log("from update service", res);
      endObj = res.data;
    });
    return endObj;
  }

 

}
export default new UserService();
