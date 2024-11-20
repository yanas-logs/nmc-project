import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  const next = requestUrl.searchParams.get("next");
  if (next) {
    return NextResponse.redirect(origin + next);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(origin);
}


