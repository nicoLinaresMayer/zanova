'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginAdmin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    const res = await fetch('/api/login-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <h1 className="font-zanova text-2xl uppercase text-center">Acceso</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
        />
        {error && <p className="text-red-400 text-xs text-center">Contraseña incorrecta</p>}
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}