import dayjs from 'dayjs';
import React, { useRef, useMemo } from 'react';
import { useReactToPrint } from 'react-to-print';

interface A4PageContainerProps {
  children: React.ReactNode;
  documentTitle?: string;
  options?: {
    printHeader?: boolean;
    landscape?: boolean;
  };
}

const A4PageContainer: React.FC<A4PageContainerProps> = ({
  children,
  documentTitle = 'Document',
  options = {},
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
          'YYYY-MM-DD HH:mm:ss'
        )}`,
        contentRef,
        pageStyle: `
      @page {
        size: ${mergedOptions.landscape ? 'A4 landscape' : 'A4'};
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

  // Inline styles extracted to constant for better readability
  const containerStyle: React.CSSProperties = {
    // width: '210mm', // Exact A4 width
    minHeight: '297mm', // Exact A4 height
    margin: '0 auto', // Center the content
    padding: '10mm', // Consistent with page margins
    boxSizing: 'border-box',
    backgroundColor: 'white',
    position: 'relative',
    pageBreakAfter: 'always',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  };

  const printButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '5mm',
    right: '5mm',
    zIndex: 1000,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px',
  };

  return (
    <section style={containerStyle}>
      <div ref={contentRef}>{children}</div>
      <button
        style={printButtonStyle}
        onClick={() => handlePrint()}
        aria-label='Print Document'
      >
        🖨️ Print
      </button>
    </section>
  );
};

export default A4PageContainer;
