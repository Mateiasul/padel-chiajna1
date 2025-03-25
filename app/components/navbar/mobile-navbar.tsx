"use client";

import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import Link from "next/link";

export default function MobileNavbar(props: {
  loggedIn: boolean;
  fullName?: string;
  email?: string;
}) {
  const pathname = usePathname();
  const navigation = [
    { name: "Despre Noi", href: "/despre-noi" },
    { name: "Locatie", href: "/locatie" },
    { name: "Preturi", href: "/preturi" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  console.log(props.loggedIn);
  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 pt-2 pb-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5 ${
                isActive
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {item.name}
            </DisclosureButton>
          );
        })}
      </div>
      {props.loggedIn ? (
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-4 sm:px-6">
            <div className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {props.fullName}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {props.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <DisclosureButton
              as="a"
              href="/account"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
            >
              Your Profile
            </DisclosureButton>
            <DisclosureButton
              as="button"
              onClick={logout}
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6 w-full text-left cursor-pointer"
            >
              Sign out
            </DisclosureButton>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6 w-full text-left cursor-pointer"
        >
          Log in
        </Link>
      )}
    </DisclosurePanel>
  );
}
