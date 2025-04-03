import { expect, test as tearDowm } from "@playwright/test";
import { RestfulBookingAPI } from "../requests/RestfulBookingAPI";

tearDowm("Clean Up", async ({ request }) => {
  const bookingApi = new RestfulBookingAPI(request);

  const response = await bookingApi.deleteBooking(
    process.env.BOOKING_ID,
    process.env.AUTH_TOKEN,
  );

  expect(response.ok()).toBeTruthy();
});
