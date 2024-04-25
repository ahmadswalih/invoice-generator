export const Table = () => {
  return (
    <div>
      <table className="table-auto mt-10 w-full p-4 text-left h-12  bg-blue-950 rounded-md   text-white    ">
        <thead>
          <tr className="font-normal  ">
            <td className="w-96 p-2">Item</td>
            <td className="">Quantity</td>
            <td className="">Rate</td>
            <td className="">Amount</td>
          </tr>
        </thead>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <textarea
                className=" resize-none w-80 h-10 focus:outline-none border border-gray-200 rounded-md mt-4 p-2 text-left overflow-hidden "
                placeholder="Description of Service or Product"
              />
            </td>
            <td>
              <input
                type="number"
                className="border w-32 focus:outline-none overflow-hidden appearance-none  resize-none border-gray-200"
                placeholder="Quantity"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
