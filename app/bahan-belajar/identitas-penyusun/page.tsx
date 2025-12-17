"use client";

import React, { useState, useEffect } from "react";

function IdentitasPenyusunPage() {
	const [iframeHeight, setIframeHeight] = useState("100vh");
	const [marginTop, setMarginTop] = useState("0px");

	useEffect(() => {
		// Calculate iframe height and margin top
		const calculateIframeHeightAndMarginTop = () => {
			const navbar = document.getElementById("navbar"); // Navbar element with id="navbar"
			const footer = document.getElementById("footer"); // Footer element with id="footer"
			const navbarHeight = navbar ? navbar.clientHeight : 0;
			const footerHeight = footer ? footer.clientHeight : 0;

			// Calculate available height for iframe
			const availableHeight = window.innerHeight - navbarHeight - footerHeight;

			// Set iframe height and margin top
			setIframeHeight(`${availableHeight}px`);
			setMarginTop(`${navbarHeight}px`);
		};

		// Calculate on mount and add resize listener
		calculateIframeHeightAndMarginTop();
		window.addEventListener("resize", calculateIframeHeightAndMarginTop);

		// Cleanup event listener
		return () => {
			window.removeEventListener("resize", calculateIframeHeightAndMarginTop);
		};
	}, []);

	return (
		<div>
			<iframe
				src="https://drive.google.com/file/d/1PPJynVku5-ECUJ2FxYojczdeVvq790a1/preview"
				title="Identitas Penyusun"
				className="w-full"
				style={{ height: iframeHeight, marginTop: marginTop }}
				allow="autoplay"
			/>
		</div>
	);
}

export default IdentitasPenyusunPage;