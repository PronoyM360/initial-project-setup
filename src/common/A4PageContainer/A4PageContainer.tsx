import dayjs from "dayjs";
import React, { useRef, useMemo, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { A4PageContainerProps } from "../Types/CommonTypes";

const A4PageContainer: React.FC<A4PageContainerProps> = ({
  children,
  documentTitle = "Document",
  options = {},
  onComplete,
}) => {
  const mergedOptions = useMemo(
    () => ({
      printHeader: true,
      landscape: false,
      ...options,
    }),
    [options]
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint(
    useMemo(
      () => ({
        documentTitle: `${documentTitle}-${dayjs().format(
          "DD-MM-YYYY HH:mm:ss"
        )}`,
        contentRef,
        pageStyle: `
      @page {
        size: ${mergedOptions.landscape ? "A4 landscape" : "A4"};
        margin: 10mm; 
      }
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
        }
        * {
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
          box-sizing: border-box !important;
        }
      }
    `,
        copyStyles: true,
        suppressErrors: true,
      }),
      [documentTitle, mergedOptions]
    )
  );

  const printButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "5mm",
    right: "5mm",
    zIndex: 1000,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: "5px",
  };

  useEffect(() => {
    handlePrint();
    onComplete?.();
  }, [handlePrint, onComplete]);

  return (
    <section style={{display: "none"}}>
      <div ref={contentRef}>{children}</div>
      <button
        style={printButtonStyle}
        onClick={() => handlePrint()}
        aria-label="Print Document"
      >
        🖨️ Print
      </button>
    </section>
  );
};

export default A4PageContainer;
