import request from "./request";

class RequestService {
  ENDPOINT = "/api/requests";

  constructor() {
    this.initInterceptor();
  }

  initInterceptor() {
    request.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // Check if the error is due to an expired token
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const accessToken = await this.refreshAccessToken(
            localStorage.getItem("refreshToken")
          );
          request.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return request(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }
  async refreshAccessToken(refreshToken: any) {
    // Implement the logic to call your backend refresh token endpoint
    // For example:
    const response = await request.post("/api/auth/refresh", { refreshToken });

    // Store the new access token in localStorage or your state management
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  }

  public createRequest(accessToken: string, data: any) {
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
}
export default new RequestService();
