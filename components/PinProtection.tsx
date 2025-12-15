'use client'

import { useState, useEffect } from 'react'

const CORRECT_PIN = '0628' // Change this to your desired PIN

export default function PinProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('site-auth')
    if (auth === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem('site-auth', 'authenticated')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect PIN')
      setPin('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div>
            <h2 className="text-center text-3xl font-bold">Enter PIN</h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">my birthday MMDD</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-widest focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                placeholder="Enter PIN"
                maxLength={4}
              />
              {error && <p className="mt-2 text-center text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 w-full rounded-lg px-4 py-3 font-semibold text-white focus:ring-2 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
