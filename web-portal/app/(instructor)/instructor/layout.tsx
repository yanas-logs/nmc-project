import Navbar from "@/components/instructor/navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const session = await supabase.auth.getUser();

  console.log(session.error?.status);

  if (
    session.error?.message == "Auth session missing!" &&
    session.data.user === null
  )
    redirect("/signin?redirectTo=/instructor/courses");
  if (session.error) throw session.error;

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
