import UserModel from "@/models/UserModel";
import request from "./request";

class UserService {
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
      console.log("from user service", res);
      return res;
    });
  }
}
export default new UserService();
