"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router

function MateriEkosistemPage() {
	const [iframeHeight, setIframeHeight] = useState("100vh");
	const [marginTop, setMarginTop] = useState("0px");
	const router = useRouter(); 

	useEffect(() => {
		const calculateIframeHeightAndMarginTop = () => {
			const navbar = document.getElementById("navbar");
			const footer = document.getElementById("footer");
			const navbarHeight = navbar ? navbar.clientHeight : 0;
			const footerHeight = footer ? footer.clientHeight : 0;

			const availableHeight = window.innerHeight - navbarHeight - footerHeight;

			setIframeHeight(`${availableHeight}px`);
			setMarginTop(`${navbarHeight}px`);
		};

		calculateIframeHeightAndMarginTop();
		window.addEventListener("resize", calculateIframeHeightAndMarginTop);

		return () => {
			window.removeEventListener("resize", calculateIframeHeightAndMarginTop);
		};
	}, []);

	return (
		<div style={{ marginTop: marginTop, position: "relative", width: "100%", backgroundColor: "#f3f4f6" }}>
			
			{/* TOMBOL KEMBALI SPESIFIK KE BAHAN AJAR */}
			<div 
				style={{ 
					position: "absolute", 
					top: "15px", 
					left: "15px", 
					zIndex: 999 
				}}
			>
				<button
					// PASTIKAN: "/bahan-ajar" adalah nama folder route halaman bahan ajar Anda
					onClick={() => router.push("/bahan-ajar")} 
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "12px 20px",
						backgroundColor: "#ffffff",
						color: "#1e40af", // Biru gelap
						border: "2px solid #1e40af",
						borderRadius: "12px",
						cursor: "pointer",
						fontWeight: "700",
						boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
						transition: "all 0.3s ease"
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.backgroundColor = "#1e40af";
						e.currentTarget.style.color = "white";
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.backgroundColor = "white";
						e.currentTarget.style.color = "#1e40af";
					}}
				>
					<svg 
						width="20" 
						height="20" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="currentColor" 
						strokeWidth="3" 
						strokeLinecap="round" 
						strokeLinejoin="round"
					>
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					KEMBALI KE BAHAN AJAR
				</button>
			</div>

			{/* IFRAME MATERI */}
			<iframe
				src="https://drive.google.com/file/d/1VFm8K3Ingss6VaaripGKme4WGNqisL76/preview"
				title="Materi khusus Ekosistem yang Harmonis"
				className="w-full"
				style={{ 
					height: iframeHeight, 
					width: "100%", 
					border: "none",
					display: "block" 
				}}
				allow="autoplay"
			/>
		</div>
	);
}

export default MateriEkosistemPage;