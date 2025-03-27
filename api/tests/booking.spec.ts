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
  test("Create a new booking", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: originalBooking,
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
    expect(responseBody.bookingid).toBeDefined();
    expect(responseBody.booking.firstname).toBe("John");
    expect(responseBody.booking.lastname).toBe("Doe");
    expect(responseBody.booking.totalprice).toBe(150);
    expect(responseBody.booking.depositpaid).toBe(true);
    expect(responseBody.booking.bookingdates.checkin).toBe("2024-04-01");
    expect(responseBody.booking.bookingdates.checkout).toBe("2024-04-10");
    expect(responseBody.booking.additionalneeds).toBe("Breakfast");
  });

  // Test to retrieve booking details
  test("Retrieve booking details", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("John");
    expect(responseBody.lastname).toBe("Doe");
    expect(responseBody.totalprice).toBe(150);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.bookingdates.checkin).toBe("2024-04-01");
    expect(responseBody.bookingdates.checkout).toBe("2024-04-10");
    expect(responseBody.additionalneeds).toBe("Breakfast");
  });

  // Test to update booking details
  test("Update booking details", async ({ request }) => {
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
