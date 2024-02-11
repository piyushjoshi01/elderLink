import { create } from "domain";
import { url } from "inspector";
import { CreateUserModel, LoginModel } from "../models/AuthModel";
import UserModel from "../models/UserModel";

import request from "./request";

class AuthService {
  ENDPOINT = "api/v1/auth";

 
  

  public async create(data: CreateUserModel): Promise<UserModel> {
    const url =`${this.ENDPOINT}/register`;
    return request.post<CreateUserModel>(url, data).then((res) => {
      return res.data;
    });
  }
}
export default new AuthService();