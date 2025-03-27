import { ICreateUpdateBooking } from "../types/requestTypes";

export const originalBooking: ICreateUpdateBooking = {
  firstname: "John",
  lastname: "Doe",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2024-04-01",
    checkout: "2024-04-10",
  },
  additionalneeds: "Breakfast",
};

export const updatedBooking: ICreateUpdateBooking = {
  firstname: "Jane",
  lastname: "Doe",
  totalprice: 200,
  depositpaid: false,
  bookingdates: {
    checkin: "2024-05-01",
    checkout: "2024-05-10",
  },
  additionalneeds: "Dinner",
};
