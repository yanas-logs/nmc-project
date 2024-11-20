import { User, UserResponse } from "@supabase/supabase-js";
import UserNav from "../user-nav";
import MaxWidthWrapper from "../max-width-wrapper";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface PropeTypes {
  session: UserResponse;
}

export default async function Navbar({ session }: PropeTypes) {
  const supabase = createClient();

  const user = session.data.user as User;

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return (
    <nav className="w-full fixed bg-white border-b z-30">
      <MaxWidthWrapper className="flex p-2 justify-between items-center">
        <div></div>
        <div className="flex gap-6 items-center">
          <Link href="/">Student</Link>
          <UserNav user={user} profile={profile} />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
