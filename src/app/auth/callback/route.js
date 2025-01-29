import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/workspaces'

    if (code) {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Auth error:', error)
            return NextResponse.redirect(new URL('/', request.url))
        }
        const { data: userData } = await supabase.from("profiles").select("*").eq("id", data.user.id)
        if (userData[0].imageUrl === null) {
            await supabase.from("profiles").update({
                imageUrl: data.user.user_metadata.avatar_url
            }).eq("id", userData[0].id)
        }

        const protocol = process.env.NEXT_PUBLIC_VERCEL_URL ? 'https' : 'http'
        const host = request.headers.get('host') || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
        const origin = `${protocol}://${host}`

        return NextResponse.redirect(new URL(next, origin))
    }

    return NextResponse.redirect(new URL('/', request.url))
}