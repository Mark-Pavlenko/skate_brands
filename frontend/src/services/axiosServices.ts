import axios from "axios";
import { API_ENDPOINT, API_TIMEOUT_MILLISEC } from "@/constants/api";

class axiosService {
  private axios;
  getCookiesHeader() {
    const config = JSON.parse(sessionStorage.getItem("dao") as string);
    if (config) {
      this.axios.defaults.headers.common[
        "jwt"
      ] = `Bearer ${config.idToken}`;
      this.axios.defaults.headers.common["public_key"] = config.app_pub_key;

      this.axios.defaults.headers.common["x-xsrf-token"] = config.x_xsrf_token;
    }
  }
  /** inject token & public key (avoid 422 HTTP validation response - prism mock) to target*/
  constructor() {
    this.axios = axios;
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.timeout = API_TIMEOUT_MILLISEC;
    this.axios.defaults.headers.common["accept"] = "application/json";
  }
  /** common methods */
  public get(url: string, params: any) {
    this.getCookiesHeader();
    return this.axios.get(url, params);
  }
  public post(url: string, body: any) {
    this.getCookiesHeader();
    return this.axios.post(url, body)
  }
  public put(url: string, body: any) {
    this.getCookiesHeader();
    return this.axios.put(url, body);
  }
  public delete(url: string, body: any) {
    this.getCookiesHeader();
    return this.axios.delete(url, body);
  }
  public uploadFile(url: string, formData: any) {
    this.getCookiesHeader();
    return this.axios({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  public async refreshCsrfToken() {
    this.getCookiesHeader();
    await this.axios.get(`${API_ENDPOINT}/v1/csrf`).then((response: any) => {
      if (response.data.csrf_token) {
        const config = JSON.parse(sessionStorage.getItem("dao") as string);
        config.x_xsrf_token = response.data.csrf_token;
        sessionStorage.setItem("dao", JSON.stringify(config));
      }
    })
  }
}
/** export instance */
export default new axiosService();
