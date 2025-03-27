import { expect } from "@playwright/test";
import { originalBooking, updatedBooking } from "../testData/bookingTestData";
import { test } from "./baseTest";

let bookingId: string;
let token: string;

test.beforeAll(async ({ bookingApi }) => {
  token = await bookingApi.getAuthToken();
});

test.describe("Booking API", async () => {
  // Test to create a booking
  test("Create a new booking", async ({ bookingApi }) => {
    bookingId = await bookingApi.createBooking(originalBooking);
    expect(bookingId).toBeDefined();
  });

  // Test to retrieve booking details
  test("Retrieve booking details", async ({ bookingApi }) => {
    const responseBody = await bookingApi.getBooking(bookingId);
    expect([responseBody]).toContainEqual(originalBooking);
  });

  // Test to update booking details
  test("Update booking details", async ({ bookingApi }) => {
    const responseBody = await bookingApi.updateBooking(
      bookingId,
      token,
      updatedBooking,
    );
    expect([responseBody]).toContainEqual(updatedBooking);
  });
});

// Test to delete booking
test.afterAll("Delete booking", async ({ bookingApi }) => {
  const response = await bookingApi.deleteBooking(bookingId, token);
  expect(response.ok()).toBeTruthy();
});
