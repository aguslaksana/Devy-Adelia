"use client";

import React, { useState, useEffect } from "react";

function CpDanTpPage() {
  const [iframeHeight, setIframeHeight] = useState("100vh");
  const [marginTop, setMarginTop] = useState("0px");

  useEffect(() => {
    const calculateIframeHeightAndMarginTop = () => {
      const navbar = document.getElementById("navbar");
      const footer = document.getElementById("footer");

      const navbarHeight = navbar ? navbar.clientHeight : 0;
      const footerHeight = footer ? footer.clientHeight : 0;

      const availableHeight =
        window.innerHeight - navbarHeight - footerHeight;

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
    <div>
      <iframe
        src="https://drive.google.com/file/d/1Cs-stpPJh2TK19kPcYwl4Ri-fhnjseta/preview"
        title="CP dan TP"
        className="w-full"
        style={{ height: iframeHeight, marginTop: marginTop }}
        allow="autoplay"
      />
    </div>
  );
}

export default CpDanTpPage;
