"use client";

import React from "react";

const ScrollLink = ({ className }) => {
	const handleClick = (e) => {
		e.preventDefault();
		const quotesSection = document.getElementById("quotes");
		if (quotesSection) {
			const offsetTop = quotesSection.offsetTop;
			const scrollToPosition = offsetTop - 64;

			// Perform smooth scrolling with desired offset
			window.scrollTo({
				top: scrollToPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<a href="#quotes" className={className} onClick={handleClick}>
			Lebih lanjut ➔
		</a>
	);
};

export default ScrollLink;
