import { Disclosure } from "@headlessui/react";

import DesktopNavbar from "./desktop-navbar";
import { createClient } from "@/app/utils/supabase/server";
import MobileNavbar from "./mobile-navbar";

export default async function NavBar() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  console.log(data, "data");
  const loggedIn = data.user ? true : false;
  const fullName = data.user?.user_metadata.displayName;
  const email = data.user?.email;
  console.log(data, "data");

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      <DesktopNavbar loggedIn={loggedIn} fullName={fullName} email={email} />

      <MobileNavbar loggedIn={loggedIn} fullName={fullName} email={email} />
    </Disclosure>
  );
}
