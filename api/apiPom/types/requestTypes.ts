export interface ICreateUpdateBooking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}
export interface IGetBookingResponse {
  bookingid: string;
  booking: ICreateUpdateBooking;
}
