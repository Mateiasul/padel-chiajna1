import CourtReservationSystem from "../components/court-reserve-sys";
import { getAllBookings } from "../services/bookings.service";
import { getAllCourts } from "../services/courts.service";

export default async function Rezerva() {
  const currentDate = new Date();
  const bookings = await getAllBookings(currentDate);
  const courts = await getAllCourts();

  if (!bookings || !courts) {
    throw new Error("something went wrong");
  }
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <CourtReservationSystem bookings={bookings} courts={courts} />
        </div>
      </div>
    </div>
  );
}
