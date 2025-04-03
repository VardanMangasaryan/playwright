import { test as setup } from "@playwright/test";
import { RestfulBookingAPI } from "../requests/RestfulBookingAPI";
import { originalBooking } from "../testData/bookingTestData";

setup("Authorize and booking creation", async ({ request }) => {
  const bookingApi = new RestfulBookingAPI(request);
  process.env.AUTH_TOKEN = await bookingApi.getAuthToken();
  process.env.BOOKING_ID = await bookingApi.createBooking(originalBooking);
});
