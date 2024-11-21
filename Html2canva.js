import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfGenerator = () => {
  const pageRef = useRef();

  const handleDownloadPdf = async () => {
    const element = pageRef.current;
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("page.pdf");
  };

  return (
    <div>
      <div ref={pageRef} style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h1>Your Page Content</h1>
        <p>This content will be converted to PDF and downloaded.</p>
      </div>
      <button onClick={handleDownloadPdf}>Download as PDF</button>
    </div>
  );
};

export default PdfGenerator;
