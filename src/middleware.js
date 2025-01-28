// middleware.js
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request) {
    try {
        const { supabase, response } = createClient(request)
        
        // Get the code and next params from the URL if they exist
        const requestUrl = new URL(request.url)
        const code = requestUrl.searchParams.get('code')
        const next = requestUrl.searchParams.get('next')

        // If we have a code, it means we're in the OAuth callback
        if (code) {
            // Allow the auth callback to process
            return response
        }

        // Check auth state
        const { data: { user } } = await supabase.auth.getUser()

        // Handle protected routes
        if (request.nextUrl.pathname.startsWith('/workspaces')) {
            if (!user) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }

        // Handle public routes
        if (request.nextUrl.pathname === '/') {
            if (user) {
                return NextResponse.redirect(new URL('/workspaces', request.url))
            }
        }

        return response
    } catch (e) {
        console.error('Middleware error:', e)
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
        '/auth/callback', // Add this to handle OAuth callbacks
    ],
}