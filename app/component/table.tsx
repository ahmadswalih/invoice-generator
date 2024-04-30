import autosize from "autosize";
import { useEffect, useRef, useState } from "react";
import { isElement } from "react-dom/test-utils";
import { text } from "stream/consumers";

export const Table = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const textareaTermsRef = useRef<HTMLTextAreaElement>(null);
  const [showDiscount, setShowDiscount] = useState<boolean>(false);
  const [showTax, setShowTax] = useState<boolean>(false);
  const [showshipping, setShowShipping] = useState<boolean>(false);
  const [billingDetails, setBillingDetails] = useState<{
    discount: number;
    tax: number;
    shipping: number;
  }>({
    discount: 0,
    tax: 0,
    shipping: 0,
  });
  const [tableData, setTableData] = useState<
    {
      quantity: number;
      rate: number;
      amount: number;
    }[]
  >([
    {
      quantity: 0,
      rate: 10,
      amount: 0,
    },
  ]);
  const [CloseButtonfordiscount, setCloseButtonfordiscount] = useState(false);
  const [closeButtonforTax, setCloseButtonforTax] = useState(false);
  const [closeButtonforShipping, setCloseButtonforShipping] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [isTax, setIsTax] = useState<boolean>(false);
  const [isShipping, setIsShipping] = useState<boolean>(false);

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleInputBlur = () => {
    setFocusedIndex(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "rate" | "quantity",
    index: number
  ) => {
    const { value } = e.target;
    setTableData((prevState) =>
      prevState.map((data, i) => {
        if (i === index) {
          return { ...data, [field]: value };
        }
        return data;
      })
    );
  };

  const addRow = () => {
    setTableData([...tableData, { quantity: 0, rate: 10, amount: 0 }]);
    // Focus on the newly added textarea
    setTimeout(() => {
      const lastIndex = tableData.length;
      const newTextArea = document.querySelector(
        `#description-${lastIndex}`
      ) as HTMLTextAreaElement | null;
      if (newTextArea) {
        newTextArea.focus();
        autosize(newTextArea); // Manually trigger resizing
      }
    }, 0);
  };
  const deleteRow = (index: number) => {
    setTableData((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleDiscount = () => {
    setIsDiscount((prevState) => !prevState);
  };

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);
  useEffect(() => {
    if (textareaDescriptionRef.current) {
      autosize(textareaDescriptionRef.current);
    }
  }, []);
  useEffect(() => {
    if (textareaTermsRef.current) {
      autosize(textareaTermsRef.current);
    }
  }, []);

  useEffect(() => {
    const newAmount = tableData[0]?.quantity * tableData[0]?.rate;
    setTableData((prevState) =>
      prevState.map((data, index) => {
        if (index === 0) {
          return { ...data, amount: newAmount };
        }
        return data;
      })
    );
  }, [tableData[0]?.quantity, tableData[0]?.rate]);

  return (
    <div>
      <table className="table-auto mt-10 w-full p-4 text-left">
        <thead>
          <tr className="font-normal bg-blue-950 rounded-md text-white">
            <td className="w-96 p-2">Item</td>
            <td>Quantity</td>
            <td>Rate</td>
            <td>Amount</td>
          </tr>
        </thead>

        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>
                <textarea
                  id={`description-${index}`}
                  ref={textareaDescriptionRef}
                  onFocus={() => handleInputFocus(index)}
                  onBlur={handleInputBlur}
                  className="resize-none w-full h-10 focus:outline-none border border-gray-200 mt-2 rounded-md p-2 text-left overflow-hidden"
                  placeholder="Description of Service or Product"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border w-28 rounded-md p-2 h-11 ml-2 focus:outline-none overflow-hidden appearance-none no-arrows resize-none border-gray-200"
                  placeholder="Quantity"
                  value={data.quantity}
                  onChange={(e) => handleInputChange(e, "quantity", index)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="border w-32 rounded-md p-2 h-10 focus:outline-none overflow-hidden appearance-none resize-none border-gray-200"
                  placeholder="Rate"
                  value={data.rate}
                  onChange={(e) => handleInputChange(e, "rate", index)}
                />
              </td>
              <td>
                <p>₹{data.amount}</p>
              </td>
              <td>
                {tableData.length > 1 && (
                  <button
                    onClick={() => deleteRow(index)}
                    className={`text-red-500 opacity-0 ${
                      focusedIndex === index
                        ? "opacity-100"
                        : "hover:opacity-100"
                    }`}
                  >
                    x
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-2 border border-2-black text-gray-700 hover:bg-green-600  hover:text-white py-2 px-4 rounded"
      >
        Add a Line
      </button>
      <div className="flex flex-end items-end justify-end">
        <div className="flex flex-col">
          <div className="flex ">
            <p className="text-left text-gray-600">SubTotal</p>
            <p className="ml-4 mr-4">INR ₹00.00</p>
          </div>
          {showDiscount ? (
            <div className="flex mt-2 ">
              <p className="text-left  text-gray-600">Discount</p>
              <p className="ml-4 mr-4">
                {" "}
                <input
                  placeholder=""
                  value={billingDetails.discount}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 5) {
                      setBillingDetails({
                        ...billingDetails,
                        discount: Number(value),
                      });
                    }
                  }}
                  onFocus={() => setCloseButtonfordiscount(true)}
                  onBlur={() => setCloseButtonfordiscount(false)}
                  className="outline-none  w-14 focus:outline-none border-none "
                  maxLength={5}
                />
              </p>
              <p
                onClick={() => setShowDiscount(false)}
                className={`ml-4 text-red-400 cursor-pointer  hover:opacity-1  ${
                  CloseButtonfordiscount
                    ? "opacity-100"
                    : " opacity-0 hover:opacity-100"
                }`}
              >
                x
              </p>
            </div>
          ) : (
            <p
              onClick={() => setShowDiscount(true)}
              className="text-green-600 font-semibold cursor-pointer mt-2 "
            >
              + Add Discount
            </p>
          )}

          {showshipping ? (
            <div className="flex mt-2 ">
              <p className="text-left  text-gray-600">Shipping</p>
              <p className="ml-4 mr-4">
                {" "}
                <input
                  placeholder=""
                  value={billingDetails.shipping}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 5) {
                      setBillingDetails({
                        ...billingDetails,
                        shipping: Number(value),
                      });
                    }
                  }}
                  onFocus={() => setCloseButtonforShipping(true)}
                  onBlur={() => setCloseButtonforShipping(false)}
                  className="outline-none  w-14 focus:outline-none border-none "
                />
              </p>
              <p
                onClick={() => setShowShipping(false)}
                className={`ml-4 text-red-400 cursor-pointer ${
                  closeButtonforShipping
                    ? "opacity-100"
                    : " opacity-0 hover:opacity-100"
                }`}
              >
                x
              </p>
            </div>
          ) : (
            <p
              onClick={() => setShowShipping(true)}
              className="text-green-600 font-semibold cursor-pointer mt-2 "
            >
              + Add Shipping
            </p>
          )}
          {showTax ? (
            <div className="flex mt-2 ">
              <p className="text-left  text-gray-600">Tax</p>
              <p className="ml-4 mr-4">
                {" "}
                <input
                  placeholder=""
                  value={billingDetails.tax}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 5) {
                      setBillingDetails({
                        ...billingDetails,
                        tax: Number(value),
                      });
                    }
                  }}
                  onFocus={() => setCloseButtonforTax(true)}
                  onBlur={() => setCloseButtonforTax(false)}
                  className="outline-none  w-14 focus:outline-none border-none "
                />
              </p>
              <p
                onClick={() => setShowTax(false)}
                className={`ml-4 text-red-400 cursor-pointer ${
                  closeButtonforTax
                    ? "opacity-100"
                    : " opacity-0 hover:opacity-100"
                }`}
              >
                x
              </p>
            </div>
          ) : (
            <p
              onClick={() => setShowTax(true)}
              className="text-green-600 font-semibold cursor-pointer mt-2 "
            >
              + Add Tax
            </p>
          )}
          <div className="flex mt-2 ">
            <p className="text-left  font-semibold  text-gray-400">
              Final Amount to Pay
            </p>
            <p className="ml-4 mr-4"> ₹00.00</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between">
        <div className="flex flex-col w-[60%]">
          <input
            type="text"
            placeholder="Additional Notes"
            className="focus:outline:none outline-none font-bold focus:border p-2 rounded-md w-full focus:border-2-gray"
          />
          <textarea
            name=""
            id=""
            ref={textareaRef}
            className="outline:none text-md focus:outline-none border border-2-gray p-2 rounded-md w-full mt-2 resize-none overflow-hidden"
            placeholder="Additional Notes : any relevent information not already covered"
          />
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between">
        <div className="flex flex-col w-[60%]">
          <input
            type="text"
            placeholder="Terms and Conditions"
            className="focus:outline:none outline-none focus:border font-bold  p-2 rounded-md w-full focus:border-2-gray"
          />
          <textarea
            name=""
            id=""
            ref={textareaTermsRef}
            className="outline:none text-md focus:outline-none border border-2-gray p-2 rounded-md w-full mt-2 resize-none overflow-hidden"
            placeholder="Terms & Conditions : late fees,payment methods,delilvery , etc"
          />
        </div>
      </div>
    </div>
  );
};
