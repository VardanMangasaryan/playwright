import { test, expect } from "@playwright/test";
import type { APIRequestContext } from "playwright-core";

const BASE_URL = "https://restful-booker.herokuapp.com";
const originalBooking = {
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

const originalSecondBooking = {
  firstname: "John2",
  lastname: "Doe2",
  totalprice: 1503,
  depositpaid: true,
  bookingdates: {
    checkin: "2024-04-01",
    checkout: "2024-04-10",
  },
  additionalneeds: "Breakfast",
};

const updatedBooking = {
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

const testData = [{ data: originalBooking }, { data: originalSecondBooking }];
let bookingId: string;
let token: string;

// Helper function to create a token
async function getAuthToken(request: APIRequestContext) {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: {
      username: "admin",
      password: "password123",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  return responseBody.token;
}

test.beforeAll(async ({ request }) => {
  token = await getAuthToken(request);
});

// Test to create a booking
test.describe("Booking tests", () => {
  testData.forEach((booking) => {
    test(`Create a new booking for ${booking.data.firstname}`, async ({
      request,
    }) => {
      const response = await request.post(`${BASE_URL}/booking`, {
        data: booking.data,
      });
      expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      bookingId = responseBody.bookingid;
      expect(responseBody.bookingid).toBeDefined();
      expect(responseBody.booking.firstname).toBe(booking.data.firstname);
      expect(responseBody.booking.lastname).toBe(booking.data.lastname);
      expect(responseBody.booking.totalprice).toBe(booking.data.totalprice);
      expect(responseBody.booking.depositpaid).toBe(booking.data.depositpaid);
      expect(responseBody.booking.bookingdates.checkin).toBe(
        booking.data.bookingdates.checkin,
      );
      expect(responseBody.booking.bookingdates.checkout).toBe(
        booking.data.bookingdates.checkout,
      );
      expect(responseBody.booking.additionalneeds).toBe(
        booking.data.additionalneeds,
      );
    });

    // Test to retrieve booking details
    test(`Retrieve booking details for ${booking.data.firstname}`, async ({
      request,
    }) => {
      const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
      expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      expect(responseBody.firstname).toBe(booking.data.firstname);
      expect(responseBody.lastname).toBe(booking.data.lastname);
      expect(responseBody.totalprice).toBe(booking.data.totalprice);
      expect(responseBody.depositpaid).toBe(booking.data.depositpaid);
      expect(responseBody.bookingdates.checkin).toBe(
        booking.data.bookingdates.checkin,
      );
      expect(responseBody.bookingdates.checkout).toBe(
        booking.data.bookingdates.checkout,
      );
      expect(responseBody.additionalneeds).toBe(booking.data.additionalneeds);
    });

    // Test to update booking details
    test(`Update booking details ${booking.data.firstname}`, async ({
      request,
    }) => {
      const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${token}`,
        },
        data: updatedBooking,
      });
      expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      expect([responseBody]).toContainEqual(updatedBooking);
    });
  });
});
test.afterAll(async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  expect(response.ok()).toBeTruthy();
  const verifyResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
  expect(verifyResponse.status()).toBe(404);
});
