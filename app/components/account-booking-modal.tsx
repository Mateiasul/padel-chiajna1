"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { GetAllBookingsResponse } from "../services/bookings.service";
import { format } from "date-fns";
import { accountCancelBooking } from "../actions/account-cancel-booking";

export default function AccountBookingModal({
  bookingModalState,
  setBookingModalState,
}: {
  bookingModalState: {
    open: boolean;
    selectedBooking: GetAllBookingsResponse[number] | null;
  };
  setBookingModalState: (bookingModalState: {
    open: boolean;
    selectedBooking: GetAllBookingsResponse[number] | null;
  }) => void;
}) {
  if (!bookingModalState.selectedBooking) return "";

  const handleCancelBooking = async () => {
    const { success } = await accountCancelBooking(
      bookingModalState.selectedBooking?.id
    );

    if (success) {
      setBookingModalState({
        open: false,
        selectedBooking: null,
      });
    }
  };

  return (
    <Dialog
      open={bookingModalState.open}
      onClose={() =>
        setBookingModalState({
          open: false,
          selectedBooking: null,
        })
      }
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900"
                >
                  Detalii rezervare
                </DialogTitle>
                <div className="mt-2">
                  <div className="flex flex-row gap-2">
                    <p className="text-sm text-black font-bold">
                      Numele terenului:
                    </p>
                    <h4 className="text-sm text-gray-500">
                      {bookingModalState.selectedBooking?.court_name}
                    </h4>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-sm text-black font-bold">Data:</p>
                    <p className="text-sm text-gray-500">
                      {format(
                        new Date(
                          bookingModalState.selectedBooking?.booking_date
                        ),
                        "EEE d MMM"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-sm text-black font-bold">
                      Interval orar:
                    </p>
                    <p className="text-sm text-gray-500">
                      {bookingModalState.selectedBooking?.start_time} -{" "}
                      {bookingModalState.selectedBooking?.end_time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => handleCancelBooking()}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Anulat-ti rezervarea
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() =>
                  setBookingModalState({
                    open: false,
                    selectedBooking: null,
                  })
                }
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Inapoi
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
