"use client";

import { useState, useEffect } from "react";

export default function OrientationChecker() {
	const [isLandscape, setIsLandscape] = useState(true);

	useEffect(() => {
		const checkOrientation = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			setIsLandscape(width > height);
		};

		// Initial check
		checkOrientation();

		// Listen for resize events
		window.addEventListener("resize", checkOrientation);

		return () => {
			window.removeEventListener("resize", checkOrientation);
		};
	}, []);

	if (isLandscape) {
		return null; // No overlay in landscape
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
			<div className="text-center text-white p-8">
				<h1 className="text-3xl font-bold mb-4">Please Rotate Your Device</h1>
				<p className="text-lg mb-4">
					This website is best viewed in landscape mode. Please rotate your device to continue.
				</p>
				<p className="text-sm">If you cannot rotate, this site may not function properly.</p>
			</div>
		</div>
	);
}
