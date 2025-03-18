"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { onSubmitAction } from "../actions/form-submit";
import { bookingFormSchema } from "../utils/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetAllBookingsResponse } from "../services/bookings.service";
import { GetAllCourtsResponse } from "../services/courts.service";

// Acesta ar veni din variabilele de mediu într-o aplicație reală

const CourtReservationSystem = ({
  bookings,
  courts,
}: {
  bookings: GetAllBookingsResponse;
  courts: GetAllCourtsResponse;
}) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [loading, setLoading] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<number | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.output<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  });

  // Intervale orare disponibile (8 AM la 10 PM)
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    return `${hour}:00 - ${hour + 1}:00`;
  });

  const isTimeSlotBooked = (courtId: number, timeSlot: string) => {
    const hour = parseInt(timeSlot.split(":")[0]);
    return bookings?.some(
      (booking) =>
        booking.court_id === courtId &&
        parseInt(booking.start_time.split(":")[0]) === hour
    );
  };

  const onSubmit = async (data: z.output<typeof bookingFormSchema>) => {
    console.log(data, "data");
    if (!selectedCourt || !selectedTimeSlot) {
      alert("Vă rugăm să selectați un teren și un interval orar");
      return;
    }

    try {
      setLoading(true);
      const startHour = selectedTimeSlot.split(":")[0];
      const endHour = String(parseInt(startHour) + 1);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("endHour", `${endHour}:00)`);
      formData.append("startHour", `${startHour}:00`);
      formData.append("court_id", selectedCourt.toString());
      formData.append("bookingDate", date);

      const { success } = await onSubmitAction(formData);

      if (!success) {
        alert("Nu s-a putut crea rezervarea. Vă rugăm să încercați din nou.");
        return;
      }

      setBookingSuccess(true);
      setSelectedCourt(undefined);
      setSelectedTimeSlot(undefined);
      reset();
    } catch (error) {
      console.error("Eroare la crearea rezervării:", error);
      alert("Nu s-a putut crea rezervarea. Vă rugăm să încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Rezervare Teren de Padel
      </h1>

      {bookingSuccess && (
        <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-sm mb-4">
          <strong className="font-bold">Succes!</strong>
          <span className="block sm:inline">
            Terenul dumneavoastră a fost rezervat cu succes.
          </span>
          <button
            className="float-right font-bold"
            onClick={() => setBookingSuccess(false)}
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Selectați Data
        </label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-sm focus:ring-2 text-indigo-600 focus:border-blue-500 text-black"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Terenuri Disponibile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courts?.map((court) => (
            <div
              key={court.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedCourt === court.id
                  ? "bg-blue-50 border-blue-500 shadow-md"
                  : "border-gray-300 hover:border-blue-300 hover:shadow-sm"
              }`}
              onClick={() => setSelectedCourt(court.id)}
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {court.name}
              </h3>
              <p className="text-gray-600">{court.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedCourt && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Intervale Orare Disponibile
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {timeSlots.map((timeSlot) => {
              const isBooked = isTimeSlotBooked(selectedCourt, timeSlot);
              return (
                <div
                  key={timeSlot}
                  className={`p-2 border text-black rounded-md text-center cursor-pointer transition-all ${
                    isBooked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedTimeSlot === timeSlot
                      ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                      : "hover:bg-gray-50 hover:border-blue-200"
                  }`}
                  onClick={() => !isBooked && setSelectedTimeSlot(timeSlot)}
                >
                  {timeSlot}
                  {isBooked && <span className="block text-xs">Rezervat</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedTimeSlot && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 shadow-xs">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Informații Client
          </h2>
          {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nume *
              </label>
              <input
                {...register("name", {
                  required: "Acest câmp este obligatoriu",
                })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email *
              </label>
              <input
                {...register("email", {
                  required: "Acest câmp este obligatoriu",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresa de email invalidă",
                  },
                })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Telefon
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 transition-colors shadow-md"
              >
                {loading ? "Se procesează..." : "Rezervă Teren"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourtReservationSystem;
