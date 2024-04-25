"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "./table";

export const Invoicepdf = () => {
  const [invoiceData, setInvoiceData] = useState<
    {
      invoiceNo: string;
      invoiceDate: Date;
      dueDate: Date;
      billTo: string;
      ToAddress: string;
      billFrom: string;
      FromAddress: string;
    }[]
  >([
    {
      invoiceNo: "",
      dueDate: new Date(),
      invoiceDate: new Date(),
      billTo: "Ramesh Sumesh",
      ToAddress: "",
      FromAddress: "",
      billFrom: "Sumesh Ramesh",
    },
  ]);
  const handleDateChange = (date: Date, field: "invoiceDate" | "dueDate") => {
    setInvoiceData((prevState) =>
      prevState.map((invoice, index) => {
        if (index === 0) {
          return { ...invoice, [field]: date };
        }
        return invoice;
      })
    );
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "invoiceNo" | "billTo" | "ToAddress" | "FromAddress" | "billFrom"
  ) => {
    const { value } = e.target;
    setInvoiceData((prevState) =>
      prevState.map((invoice, index) => {
        if (index === 0) {
          return { ...invoice, [field]: value };
        }
        return invoice;
      })
    );
  };
  return (
    <div className=" text-lg p-4 items-center justify-center   mt-10 bg-white border-2 border-gray-100">
      <h1 className="text-3xl  mt-10 font-semibold">Invoice</h1>
      <div className="flex  justify-between mt-4">
        <div className="">
          <p>
            Invoice No:{" "}
            <span>
              <input
                type="text"
                placeholder="123456"
                className="focus:outline-none "
                value={invoiceData[0]?.invoiceNo}
                onChange={(e) => handleInputChange(e, "invoiceNo")}
                maxLength={6}
              />
            </span>
          </p>
          <p>
            Invoice Date:{" "}
            <span>
              {" "}
              <DatePicker
                className="focus:outline-none  w-52"
                selected={invoiceData[0]?.invoiceDate}
                onChange={(date: Date) => handleDateChange(date, "invoiceDate")}
              />{" "}
            </span>
          </p>
          <div className="mt-4 flex flex-col">
            <p>To:</p>
            <input
              type="text"
              maxLength={42}
              className="focus:outline-none w-96"
              value={invoiceData[0]?.billTo}
              onChange={(e) => handleInputChange(e, "billTo")}
            />
            <textarea
              className="focus:outline-none overflow-hidden  resize-none font-light w-60 "
              value={invoiceData[0]?.ToAddress}
              placeholder="Address"
              maxLength={60}
              onChange={(e) => handleInputChange(e, "ToAddress")}
            />
          </div>
        </div>
        <div>
          <p className="">
            Due Date:{" "}
            <span>
              {" "}
              <DatePicker
                className="focus:outline-none text-red-600 w-52"
                selected={invoiceData[0]?.dueDate}
                onChange={(date: Date) => handleDateChange(date, "dueDate")}
              />{" "}
            </span>{" "}
          </p>
          <div className="mt-10 flex flex-col">
            <p>From:</p>
            <input
              type="text"
              maxLength={42}
              className="focus:outline-none w-96"
              value={invoiceData[0]?.billFrom}
              onChange={(e) => handleInputChange(e, "billFrom")}
            />
            <textarea
              className="focus:outline-none  overflow-hidden resize-none  font-light w-60 "
              value={invoiceData[0]?.FromAddress}
              placeholder="Address"
              maxLength={60}
              onChange={(e) => handleInputChange(e, "FromAddress")}
            />
          </div>
        </div>
      </div>

      <Table />
    </div>
  );
};
