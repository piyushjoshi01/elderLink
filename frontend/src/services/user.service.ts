import request from "./request";

class UserService {
  ENDPOINT = "/api";

  public async getById(accessToken: string|null,id?: number|null): Promise<any> {
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
