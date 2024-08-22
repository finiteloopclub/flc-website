import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

import AuthButton from "~/components/navBar/authButton";
import { userNavItems } from "~/constants";

import Logo from "../logo";
import MobileNav from "./mobileNav";

const Navbar: FunctionComponent = ({}) => {
  const router = useRouter();

  const activePath = userNavItems.find((link) => link.link === router.pathname);

  return (
    // NOTE: If h or py changes, update in <Layout/> as well
    <nav className="fixed top-0 z-50 flex w-full items-center justify-center border-0 border-b border-black px-20 py-4 backdrop-blur-lg backdrop-filter dark:border-white">
      <Link href="/" className="flex cursor-pointer items-center gap-3">
        <Logo />
        <p className="hidden font-bold lg:block lg:text-2xl">
          Finite-Loop-Club
        </p>
      </Link>
      <div className="ml-auto flex items-center gap-8 ">
        <div className="hidden gap-8 sm:flex">
          {userNavItems.map((link) => (
            <Link
              key={link.link}
              className="group space-y-0.5 text-foreground"
              href={link.link}
            >
              <p className="px-0.5 text-sm font-bold md:text-base">
                {link.name}
              </p>
              <span
                className={`${
                  activePath?.name === link.name ? "max-w-full" : "max-w-0"
                } block h-0.5 bg-white transition-all duration-500 group-hover:max-w-full`}
              ></span>
            </Link>
          ))}
        </div>

        {/*<SunMoonToggle />*/}

        <AuthButton />

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
