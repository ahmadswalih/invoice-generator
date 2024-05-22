"use client";

import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";
import { Invoicepdf } from "./Invoicepdf";
import dynamic from "next/dynamic";

const PDFViewerNoSSR = dynamic(
  async () => {
    const ReactPDF = await import("@react-pdf/renderer");
    return ReactPDF.PDFViewer;
  },
  { ssr: false }
);

const PdfGenerator = () => {
  return (
    <PDFViewerNoSSR>
      <Document>
        <Page size="A4" style={{ padding: "1cm" }}>
          <View>
            <Invoicepdf />
          </View>
        </Page>
      </Document>
    </PDFViewerNoSSR>
  );
};

export default PdfGenerator;
