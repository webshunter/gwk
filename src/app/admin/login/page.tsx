import { redirect } from "next/navigation"
import Image from "next/image"
import "../design/custom-admin.css"

import LoginForm from "./LoginForm"
import { getCurrentAdmin } from "@/lib/adminSession"

export default async function AdminLoginPage() {
	const currentAdmin = await getCurrentAdmin()

	if (currentAdmin) {
		redirect("/admin")
	}

	return (
		<div className="admin-login-page">
			{/* Background Effects */}
			<div className="admin-login-bg">
				<div className="admin-login-bg-1"></div>
				<div className="admin-login-bg-2"></div>
				<div className="admin-login-bg-3"></div>
			</div>

			{/* Main Container */}
			<div className="admin-login-container">
				{/* Left Side - Branding */}
				<div className="admin-login-branding">
					{/* Logo */}
					<div className="admin-login-logo">
						<div className="admin-login-logo-bg"></div>
						<div className="admin-login-logo-content">
							<div className="admin-login-logo-img">
								<Image
									src="/images/logogwk.svg"
									alt="GWK Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
						</div>
					</div>

					{/* Branding Text */}
					<div className="admin-login-text">
						<div>
							<h1 className="admin-login-title">
								GWK Admin
							</h1>
							<p className="admin-login-subtitle">
								Cultural Park Management System
							</p>
						</div>
						
						<div className="admin-login-features">
							<p className="admin-login-desc">
								Kelola konten dan pengalaman digital untuk taman budaya terbesar di Indonesia
							</p>
							
							{/* Features */}
							<div className="admin-login-feature-list">
								{[
									{ icon: "🎨", text: "Page Builder Modern" },
									{ icon: "📱", text: "Responsive Design" },
									{ icon: "🔒", text: "Keamanan Terjamin" },
									{ icon: "⚡", text: "Performance Optimal" }
								].map((feature, index) => (
									<div key={index} className="admin-login-feature-item">
										<span className="admin-login-feature-icon">{feature.icon}</span>
										<span className="admin-login-feature-text">{feature.text}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Right Side - Login Form */}
				<div className="admin-login-form-section">
					<div className="admin-login-form-container">
						{/* Mobile Logo */}
						<div className="admin-login-mobile-logo">
							<div className="admin-login-mobile-logo-img">
								<Image
									src="/images/logogwk.svg"
									alt="GWK Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
							<h1 className="admin-login-mobile-title">
								GWK Admin Portal
							</h1>
						</div>

						{/* Login Form */}
						<div className="admin-login-form-wrapper">
							<div className="admin-login-form-bg"></div>
							<div className="admin-login-form-content">
								<LoginForm />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Decoration */}
			<div className="admin-login-bottom"></div>
		</div>
	)
}
