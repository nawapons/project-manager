"use client"
import { getCurrent } from '@/components/auth/api/use-get-current'
import { useParams } from 'next/navigation'
import React from 'react'
import { WorkspaceIdClient } from './client'

export default function Workspace({params}) {
    return <WorkspaceIdClient/>
}
