import { clsx } from "clsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utility function to transform header (column) names
const transformHeader = (header) => {
  return header.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const handlePDFDownload = ({ data, fileName }) => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  const margin = 5;
  const startY = 5; // Adjust this to set the top margin
  doc.autoTable({
    head: [Object.keys(data[0]).map((key) => transformHeader(key))],
    body: data.map((row) => Object.values(row)),
    startY: startY + margin,
  });
  doc.save(fileName);
};

export const handleCSVDownload = ({ data, fileName }) => {
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  csv = csv.join("\r\n");

  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv);
  link.target = "_blank";
  link.download = fileName + ".csv";
  link.click();
};

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
