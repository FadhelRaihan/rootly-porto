'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      window.location.href = '/admin/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#111110] bg-[radial-gradient(#1c1c1a_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1C1C1A] border-[#2E2E2C] border-dashed rounded-lg text-white font-mono text-xs">
        <CardHeader className="text-center border-b border-dashed border-[#2E2E2C] pb-5">
          <div className="mx-auto mb-4 h-12 px-5 border border-dashed border-[#1D9E75] bg-[#1D9E75]/5 flex items-center justify-center max-w-[180px]">
            <Image src="/icon/Logo-NameIconWhite.svg" width={120} height={30} alt="Logo" className="h-6 w-auto" />
          </div>
          <CardTitle className="text-base text-white font-bold font-mono uppercase tracking-wider">
            {"[ ROOTLY // SECURE_ACCESS_GATEWAY ]"}
          </CardTitle>
          <div className="flex items-center justify-between text-gray-500 font-bold uppercase tracking-wider text-[8px] max-w-xs mx-auto mt-3 border-t border-dashed border-[#2E2E2C]/50 pt-2 w-full">
            <span>PORT_STATUS: ACTIVE</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
              SECURE
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                IDENTITY_KEY // EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter authorized email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#111110] border-[#2E2E2C] border-dashed text-white mt-1 h-10 font-mono text-xs focus-visible:ring-[#1D9E75]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                SECRET_KEY // PASSWORD
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter credential hash..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#111110] border-[#2E2E2C] border-dashed text-white pr-10 h-10 font-mono text-xs focus-visible:ring-[#1D9E75]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 border border-dashed border-red-500/35 bg-red-950/20 text-red-500 rounded-md font-mono text-[10px] leading-relaxed">
                {`// ACCESS_DENIED: CREDENTIALS_HASH_MISMATCH (ERR_0x401)`}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#1D9E75] hover:bg-[#1a8c66] text-white font-mono text-xs uppercase tracking-wider border border-[#1D9E75] hover:border-[#1a8c66] rounded-md h-10 cursor-pointer shadow-xs transition-all duration-200 mt-2"
              disabled={loading}
            >
              {loading ? 'EXECUTING_HANDSHAKE...' : '[ EXECUTE_SIGN_IN_SEQUENCE ]'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}