import { CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import AccountInfoForm from "@/app/components/account-info-form";
import AccountBookings from "@/app/components/account-bookings-section";
import { createClient } from "@/app/utils/supabase/server";
import { getBookingsByUser } from "../../services/bookings.service";

const secondaryNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
  { name: "Rezervari", href: "#", icon: CreditCardIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function Example() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userFullName = data.user?.user_metadata.displayName;
  const email = data.user?.email;
  const bookings = await getBookingsByUser();

  if (!email || !userFullName) {
    throw new Error("something went wrong");
  }

  return (
    <>
      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "size-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <AccountInfoForm
              fullName={userFullName}
              email={email}
            ></AccountInfoForm>

            <AccountBookings bookings={bookings}></AccountBookings>
          </div>
        </main>
      </div>
    </>
  );
}
