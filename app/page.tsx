"use client";
import { Invoicepdf } from "./component/Invoicepdf";
import PdfGenerator from "./component/documentInvoice";
import InvoiceDownloadButton from "./component/downloadbtn";
import { useRef } from "react";
//mport html2pdf from "html2pdf.js";

export default function Home() {
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl ">Invoice Generator</h1>
        <p className="text-xl mt-3">
          Easiest Invoice Generator Available Online 😁.
        </p>
        <p className=" bg-gray-50 mt-4 border-2 p-2 rounded-lg">
          #Reinventingthewheelagain
        </p>
        <div id="invoicePdf" ref={invoiceRef}>
          <Invoicepdf />
        </div>
        <p
          className="p-2 bg-blue-900 text-white mb-10 cursor-pointer"
          onClick={handlePrint}
        >
          Download Invoice
        </p>

        <a target="_blank" className="mb-10" href="https://ahmadswalih.com">
          ©ahmadswalih.com ↗
        </a>
      </div>
    </div>
  );
}
