import { errorHandler } from "api/error-handler";
import { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { UserLogin, User } from "../models/user";

export class AuthService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async authenticate(user: UserLogin): Promise<AxiosResponse<User | undefined>> {
    try {
      const response = await this.httpClient.post<User>(`/users/sign_in`, {
        user,
      });

      if (response) {
        return response;
      }
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
