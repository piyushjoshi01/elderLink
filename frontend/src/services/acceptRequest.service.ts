import { config } from "process";
import request from "./request";

class acceptRequestservice{
  ENDPOINT = "api/requestsHistory";

  
  public createRequestHistory(accessToken: string|null, data: any) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = `${this.ENDPOINT}/create`;
    return request.post<any>(url, data, config).then((res) => {
      return res.data;
    });
  }
  public getAcceptedRequest(accessToken: string|null){
    const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const url = `${this.ENDPOINT}`;
      return request.get<any>(url,config).then((res) => {
        return res.data;
      });

    }
  }

  
  
  





export default new acceptRequestservice();
