import Image from "next/image";
import {
  createClient,
} from "@/utils/supabase/server";

import logo from "@/assets/svgs/Logo2.svg";
import CategoriesMenu from "./categories-menu";
import SearchBar from "./search-bar";
import SideMenu from "./side-menu";
import Search from "./search";
import data from "@/lib/fake-data.json";
import Link from "next/link";
import UserNav from "./user-nav";
import { User } from "@supabase/supabase-js";

export default async function Navbar() {
  const supabase = createClient();
  let { data: category, error } = await supabase
    .from("categories")
    .select(`id, name, sub_categories ( id, name )`);

  if (error) throw error;

  const session = await supabase.auth.getUser();

  return (
    <nav className="shadow-md bg-slate-100">
      <div className="h-16 p-3 flex justify-between md:justify-center items-center gap-4 mx-auto max-w-7xl">
        <SideMenu mostPopular={data.MostPopular} categories={data.Categories} />
        <div className="">
          <Image src={logo} alt="logo" height={100} />
        </div>
        <div className="relative group hidden md:block">
          <button className="group-hover:text-primary-blue">Categories</button>
          <div className="hidden absolute top-6 py-6 group-hover:block z-50">
            <CategoriesMenu categories={category} />
          </div>
        </div>
        <div className="hidden md:block flex-1">
          <SearchBar />
        </div>

        <button className="hidden lg:block hover:text-primary-blue">
          Teach on xxx
        </button>
        <button className="hidden md:block hover:fill-primary-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z" />
          </svg>
        </button>
        {session.data.user ? (
          <UserNav user={session.data.user as User} />
        ) : (
          <div className="hidden md:flex gap-2">
            <Link
              href="/signin"
              className="px-5 py-2 bg-primary-button text-text rounded-sm hover:text-white hover:shadow"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-secondary-button text-text rounded-sm hover:text-primary-blue hover:shadow"
            >
              Sign Up
            </Link>
          </div>
        )}

        <div className="md:hidden flex gap-3">
          <Search />
          <button className="fill-gray-600 hover:fill-primary-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z" />
            </svg>
          </button>
        </div>
      </div>
      {session.data.user && (
        <ul className="flex justify-center items-center gap-4 p-4 border-t">
          {category?.slice(0, 8)?.map((c) => (
            <Link
              key={c.id}
              className="hover:text-primary-blue hover:cursor-pointer"
              href={`/courses/${c.name}`}
            >
              {c.name}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
}
