import { expect } from "@playwright/test";
import { originalBooking, updatedBooking } from "../testData/bookingTestData";
import { test } from "./baseTest";

test.beforeAll(async ({ bookingApi }) => {
  process.env.AUTH_TOKEN = await bookingApi.getAuthToken();
});

test.describe("Booking API", async () => {
  // Test to retrieve booking details
  test("Retrieve booking details", async ({ bookingApi }) => {
    const responseBody = await bookingApi.getBooking(process.env.BOOKING_ID);
    expect([responseBody]).toContainEqual(originalBooking);
  });

  // Test to update booking details
  test("Update booking details", async ({ bookingApi }) => {
    const responseBody = await bookingApi.updateBooking(
      process.env.BOOKING_ID,
      process.env.AUTH_TOKEN,
      updatedBooking,
    );
    expect([responseBody]).toContainEqual(updatedBooking);
  });
});

test.afterAll("Delete booking", async ({ bookingApi }) => {
  const response = await bookingApi.deleteBooking(
    process.env.BOOKING_ID,
    process.env.AUTH_TOKEN,
  );
  expect(response.ok()).toBeTruthy();
});
