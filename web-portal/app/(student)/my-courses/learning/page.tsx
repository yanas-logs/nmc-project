import { createClient } from "@/utils/supabase/server";

export default async function Learning() {
  const supabase = createClient();

  const { data: session } = await supabase.auth.getUser();
  const { data: courses, error } = supabase
    .from("courses_md")
    .select(
      `
      id,
      image, 
      title, 
      short_description,
      instructors,
    `
    )
    .eq("enrollments.user_id", session.user?.id);

  if (error) throw error;

  return <h1>Learning</h1>;
}
