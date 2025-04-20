/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import { TablePDFContainerProps } from "../Types/CommonTypes";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const A4PDFContainer: React.FC<TablePDFContainerProps> = ({
  data,
  columns,
  documentTitle = "Document",
  options = {},
  onComplete,
}) => {
  const mergedOptions = useMemo(
    () => ({
      landscape: false,
      fontSize: 10,
      headerColor: "#e8f5e9",
      alternateRowColor: true,
      ...options,
    }),
    [options]
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const hasGeneratedPdf = useRef(false);

  const handleDownload = () => {
    if (hasGeneratedPdf.current) return;

    try {
      const pdf = new jsPDF({
        orientation: mergedOptions.landscape ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      const headers = columns
        .filter((col) => col.title !== "Actions")
        .map((col) => col.title);

      const rows = data.map((record) =>
        columns
          .filter((col) => col.title !== "Actions")
          .map((col) => {
            const value = col.dataIndex
              ? record[col.dataIndex as keyof any]
              : "";

            if (col.dataIndex === "created_at" && value) {
              return dayjs(record.created_at).format("DD-MM-YYYY HH:mm:ss");
            }
            if (col.dataIndex === "status") {
              return value === true ? "Active" : "Inactive";
            }

            return value?.toString() || "";
          })
      );
      pdf.autoTable({
        head: [headers],
        body: rows,
        startY: 20,
        headStyles: {
          fillColor: [232, 245, 233],
          textColor: [0, 0, 0],
          fontSize: mergedOptions.fontSize + 2,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: mergedOptions.fontSize,
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: mergedOptions.alternateRowColor ? [245, 245, 245] : null,
        },
        margin: { top: 20, right: 15, bottom: 20, left: 15 },
        didDrawPage: (data: any) => {
          pdf.setFontSize(16);
          pdf.text(documentTitle, 15, 15);

          pdf.setFontSize(10);
          pdf.text(
            `Page ${data.pageNumber}`,
            pdf.internal.pageSize.width / 2,
            pdf.internal.pageSize.height - 10,
            { align: "center" }
          );
        },
      });

      const filename = `${documentTitle}-${dayjs().format(
        "DD-MM-YYYY-HHmmss"
      )}.pdf`;
      pdf.save(filename);
      hasGeneratedPdf.current = true;
      onComplete?.();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    handleDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={contentRef}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", display: "none" }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={record.id || index}>
              {columns.map((column) => (
                <td key={`${record.id}-${column.key}`}>
                  {column.render && column.dataIndex
                    ? column.render(
                        record[column.dataIndex as keyof any] ?? "",
                        record
                      )
                    : column.dataIndex === "created_at" && record.created_at
                    ? dayjs(record.created_at).format("DD-MM-YYYY HH:mm:ss")
                    : record[column.dataIndex as keyof any] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default A4PDFContainer;
