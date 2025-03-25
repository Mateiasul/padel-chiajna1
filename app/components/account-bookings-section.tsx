"use client";

import { format } from "date-fns";
import { GetAllBookingsResponse } from "../services/bookings.service";
import { useState } from "react";
import AccountBookingModal from "./account-booking-modal";

export default function AccountBookings({
  bookings,
}: {
  bookings: GetAllBookingsResponse | undefined;
}) {
  const [bookingModalState, setBookingModalState] = useState<{
    open: boolean;
    selectedBooking: GetAllBookingsResponse[number] | null;
  }>({
    open: false,
    selectedBooking: null,
  });

  return (
    <div className="space-y-12">
      <AccountBookingModal
        bookingModalState={bookingModalState}
        setBookingModalState={setBookingModalState}
      />
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">Rezervari</h2>
        <p className="mt-1 text-sm/6 text-gray-300">
          Aici puteti vedea rezervarile
        </p>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end cursor-pointer">
        {bookings?.map((booking, index) => {
          if (!booking.isActive) return "";
          return (
            <div
              onClick={() =>
                setBookingModalState({
                  open: true,
                  selectedBooking: booking,
                })
              }
              className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-300 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start"
              key={index}
            >
              <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">
                {booking.court_name}
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  {format(new Date(booking.booking_date), "EEE d MMM")}
                </p>
                <p className="mt-2 text-base/7 text-gray-600">
                  {booking.start_time} - {booking.end_time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
