"use client";

// import { redirect } from "next/navigation";

// export default function RedirectPage() {
// 	// This function will be called on the server side.
// 	// Perform the redirection
// 	redirect("https://www.example.com");

// 	// The function should never reach here because `redirect` will end the response.
// 	return null;
// }

import React, { useState, useEffect } from "react";

function PostTest() {
	const [iframeHeight, setIframeHeight] = useState("100vh");
	const [marginTop, setMarginTop] = useState("0px");
	const [showModal, setShowModal] = useState(false); // State to control modal visibility

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

		// Detect mobile device and show modal
		const isMobile = window.innerWidth < 768; // Adjust the width as needed
		if (isMobile) {
			setShowModal(true);
		}

		// Cleanup event listener
		return () => {
			window.removeEventListener("resize", calculateIframeHeightAndMarginTop);
		};
	}, []);

	return (
		<div>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLScjbTv8FRajAcxj0XiceQ4Jw2culvCHAn6uYwvQx9cRRTHjXA/viewform"
				title="PostTest"
				className="w-full"
				style={{ height: iframeHeight, marginTop: marginTop }}
			/>
		</div>
	);
}

export default PostTest;
