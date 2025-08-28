'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PortfolioAdmin from '@/components/admin/PortfolioAdmin'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const authenticated = sessionStorage.getItem('chiro_admin_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (password === '0812') {
        setIsAuthenticated(true)
        sessionStorage.setItem('chiro_admin_authenticated', 'true')
      } else {
        setError('잘못된 비밀번호입니다.')
      }
      setLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('chiro_admin_authenticated')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E1111] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">CHIRO 관리자</h1>
              <p className="text-gray-400">포트폴리오 관리 시스템</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0E1111] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={loading}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
              >
                {loading ? '확인 중...' : '로그인'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0E1111]">
      <div className="sticky top-0 z-10 bg-[#1A1F1F] border-b border-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-white">CHIRO 포트폴리오 관리</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors duration-200"
          >
            로그아웃
          </button>
        </div>
      </div>
      
      <PortfolioAdmin />
    </div>
  )
}