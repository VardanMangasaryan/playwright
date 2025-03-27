import { ICreateUpdateBooking } from "../types/requestTypes";
import { APIRequestContext } from "playwright-core";
import { BaseRequest } from "./BaseRequest";

export class RestfulBookingAPI extends BaseRequest {
  private readonly baseUrl: string;
  constructor(request: APIRequestContext) {
    super(request);
    this.baseUrl = "https://restful-booker.herokuapp.com";
  }

  async getAuthToken(): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: {
        username: "admin",
        password: "password123",
      },
    });
    const responseBody = await response.json();
    return responseBody.token;
  }

  async createBooking(data: ICreateUpdateBooking) {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data,
    });
    const responseBody = await response.json();
    return responseBody.bookingid;
  }

  async getBooking(bookingId: string) {
    const response = await this.request.get(
      `${this.baseUrl}/booking/${bookingId}`,
    );
    return await response.json();
  }

  async updateBooking(
    bookingId: string,
    token: string,
    data: ICreateUpdateBooking,
  ) {
    const response = await this.request.put(
      `${this.baseUrl}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        data: data,
      },
    );
    return await response.json();
  }

  async deleteBooking(bookingId: string, token: string) {
    return await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
