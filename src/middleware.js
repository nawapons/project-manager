import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
export async function middleware(request) {
    try {
        const { supabase, response } = createClient(request)
        await supabase.auth.getUser()
        if (request.nextUrl.pathname.includes('workspaces')) {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        
        }
        if (request.nextUrl.pathname === '/') {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if(user){
                return NextResponse.redirect(new URL('/workspaces', request.url))
            }
        }
        return response
    } catch (e) {
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        })
    }
}

export const config = {
    matcher: [
        '/',
        '/workspaces',
        '/workspaces/:path*',
        '/account',
        '/reset-password',
    ],
}