import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        <a
          className="visit-button"
          href="https://niftic.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit Niftic.com
        </a>
      </div>
      <div className="footer">
        {user && <p>Welcome back, {user.email}</p>}
        <a
          className="admin-link"
          href={payloadConfig.routes.admin}
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to admin panel
        </a>
      </div>
    </div>
  )
}
