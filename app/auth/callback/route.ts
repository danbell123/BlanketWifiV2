import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();

    // Exchange the code for a session
    const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(code);

    if (authData && authData.session && authData.session.user) {
      // Fetch the tenantID from the database
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', authData.session.user.id)
        .single();

      if (user && user.tenant_id) {
        // Create a cookie for the tenantID
        const cookie = `tenant_id=${user.tenant_id}; Path=/; HttpOnly; SameSite=Lax; Secure`;

        // Create a response and set the cookie
        const response = NextResponse.redirect(`${origin}/protected`);
        response.headers.append('Set-Cookie', cookie);

        return response;
      } else if (userError) {
        console.error('Failed to fetch tenantID:', userError);
        // Handle user error specifics here
      }
    } else if (authError) {
      console.error('Auth exchange error:', authError);
      // Handle auth error specifics here
    }
  }

  // Redirect user to login or error page if authentication fails
  return NextResponse.redirect(`${origin}/login`);
}
