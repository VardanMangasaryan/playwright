import { test as base } from "@playwright/test";
import { RestfulBookingAPI } from "../requests/RestfulBookingAPI";

export const test = base.extend<{
  bookingApi: RestfulBookingAPI;
}>({
  bookingApi: async ({ request }, use) => {
    await use(new RestfulBookingAPI(request));
  },
});
