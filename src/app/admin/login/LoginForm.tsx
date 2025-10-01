'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Shield, Sparkles } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login berhasil, redirect ke admin dashboard
        router.push('/admin')
      } else {
        setError(data.error || 'Login gagal')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-form">
      {/* Header dengan animasi */}
      <div className="admin-login-form-header">
        <div className="admin-login-form-icon">
          <div className="admin-login-form-icon-bg"></div>
          <div className="admin-login-form-icon-content">
            <Shield className="admin-login-form-icon-svg" />
          </div>
        </div>
        <div>
          <h1 className="admin-login-form-title">
            Selamat Datang
          </h1>
          <p className="admin-login-form-subtitle">Masuk ke GWK Admin Portal</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="admin-login-form-info">
        <div className="admin-login-form-info-bg"></div>
        <div className="admin-login-form-info-content">
          <div className="admin-login-form-info-header">
            <div className="admin-login-form-info-icon">
              <Sparkles className="admin-login-form-info-icon-svg" />
            </div>
            <div className="admin-login-form-info-text">
              <p className="admin-login-form-info-title">Akses Administrator</p>
              <p className="admin-login-form-info-desc">
                Gunakan kredensial admin yang telah dikonfigurasi. Hubungi administrator sistem jika mengalami kesulitan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Login */}
      <form onSubmit={handleSubmit} className="admin-login-form-fields">
        {/* Email Field */}
        <div className="admin-login-form-field">
          <label htmlFor="email" className="admin-login-form-label">
            Email Administrator
          </label>
          <div className="admin-login-form-input-group">
            <div className="admin-login-form-input-icon">
              <Mail className="admin-login-form-input-icon-svg" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="admin-login-form-input"
              placeholder="admin@gwk.com"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="admin-login-form-field">
          <label htmlFor="password" className="admin-login-form-label">
            Password
          </label>
          <div className="admin-login-form-input-group">
            <div className="admin-login-form-input-icon">
              <Lock className="admin-login-form-input-icon-svg" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-login-form-input"
              placeholder="Masukkan password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="admin-login-form-password-toggle"
            >
              {showPassword ? (
                <EyeOff className="admin-login-form-password-icon" />
              ) : (
                <Eye className="admin-login-form-password-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="admin-login-form-error">
            <div className="admin-login-form-error-bg"></div>
            <div className="admin-login-form-error-content">
              <div className="admin-login-form-error-header">
                <div className="admin-login-form-error-dot"></div>
                <p className="admin-login-form-error-text">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="admin-login-form-submit"
        >
          <div className="admin-login-form-submit-content">
            <div className="admin-login-form-submit-inner">
              {loading ? (
                <>
                  <div className="admin-login-form-spinner"></div>
                  <span className="admin-login-form-submit-text">Memproses...</span>
                </>
              ) : (
                <>
                  <Shield className="admin-login-form-submit-icon" />
                  <span className="admin-login-form-submit-text">Masuk ke Dashboard</span>
                </>
              )}
            </div>
          </div>
        </button>
      </form>

      {/* Footer */}
      <div className="admin-login-form-footer">
        <p className="admin-login-form-footer-text">
          © 2024 Garuda Wisnu Kencana Cultural Park
        </p>
      </div>

      <style jsx>{`
        .admin-login-form {
          width: 100%;
          max-width: 448px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .admin-login-form-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .admin-login-form-icon {
          position: relative;
          margin: 0 auto;
          width: 80px;
          height: 80px;
        }

        .admin-login-form-icon-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #3b82f6, #9333ea, #ec4899);
          border-radius: 16px;
          filter: blur(24px);
          opacity: 0.75;
          animation: pulse 2s ease-in-out infinite;
        }

        .admin-login-form-icon-content {
          position: relative;
          background: linear-gradient(135deg, #3b82f6, #9333ea, #ec4899);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .admin-login-form-icon-svg {
          width: 48px;
          height: 48px;
          color: white;
          margin: 0 auto;
          display: block;
        }

        .admin-login-form-title {
          font-size: 30px;
          font-weight: 700;
          background: linear-gradient(90deg, #ffffff, #dbeafe, #e0e7ff);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .admin-login-form-subtitle {
          color: #94a3b8;
          margin-top: 8px;
        }

        .admin-login-form-info {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
        }

        .admin-login-form-info-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05));
        }

        .admin-login-form-info-content {
          position: relative;
          padding: 24px;
        }

        .admin-login-form-info-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .admin-login-form-info-icon {
          flex-shrink: 0;
        }

        .admin-login-form-info-icon-svg {
          width: 20px;
          height: 20px;
          color: #60a5fa;
          margin-top: 2px;
        }

        .admin-login-form-info-text {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-login-form-info-title {
          font-size: 14px;
          font-weight: 600;
          color: #93c5fd;
        }

        .admin-login-form-info-desc {
          font-size: 12px;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .admin-login-form-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .admin-login-form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-login-form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .admin-login-form-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-login-form-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .admin-login-form-input-icon-svg {
          width: 20px;
          height: 20px;
          color: #94a3b8;
          transition: color 0.2s ease;
        }

        .admin-login-form-input-group:focus-within .admin-login-form-input-icon-svg {
          color: #60a5fa;
        }

        .admin-login-form-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          outline: none;
        }

        .admin-login-form-input::placeholder {
          color: #94a3b8;
        }

        .admin-login-form-input:focus {
          border-color: rgba(96, 165, 250, 0.5);
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1);
        }

        .admin-login-form-password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .admin-login-form-password-toggle:hover {
          color: white;
        }

        .admin-login-form-password-icon {
          width: 20px;
          height: 20px;
        }

        .admin-login-form-error {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          backdrop-filter: blur(8px);
        }

        .admin-login-form-error-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(239, 68, 68, 0.05), rgba(236, 72, 153, 0.05));
        }

        .admin-login-form-error-content {
          position: relative;
          padding: 16px;
        }

        .admin-login-form-error-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-login-form-error-dot {
          width: 8px;
          height: 8px;
          background: #f87171;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .admin-login-form-error-text {
          font-size: 14px;
          color: #fecaca;
          font-weight: 500;
        }

        .admin-login-form-submit {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          background: linear-gradient(90deg, #2563eb, #9333ea, #ec4899);
          padding: 2px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .admin-login-form-submit:hover:not(:disabled) {
          transform: scale(1.02);
        }

        .admin-login-form-submit:focus:not(:disabled) {
          transform: scale(1.02);
        }

        .admin-login-form-submit:disabled {
          transform: scale(1);
          opacity: 0.7;
        }

        .admin-login-form-submit-content {
          position: relative;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          padding: 16px 24px;
          transition: all 0.3s ease;
        }

        .admin-login-form-submit:hover .admin-login-form-submit-content {
          background: rgba(15, 23, 42, 0.3);
        }

        .admin-login-form-submit-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .admin-login-form-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .admin-login-form-submit-icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .admin-login-form-submit-text {
          font-weight: 600;
          color: white;
        }

        .admin-login-form-footer {
          text-align: center;
        }

        .admin-login-form-footer-text {
          font-size: 12px;
          color: #64748b;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}