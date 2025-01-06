"use client"
import { getCurrent } from '@/components/auth/api/use-get-current'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Workspace({params}) {
    return (
        <div>Workspace ID : {params.workspaceId}</div>
    )
}
