import { Input } from "@/components/ui/input";

const CashDenomTable = ({
  notes,
  denominators,
  totalAmount,
  cashTransactionGrandTotal,
  handleDenominatorChange,
  amountTobePaid,
  outTable,
}) => {
  return (
    <table className=" w-full border-separate border-spacing-5">
      <thead className="w-full ">
        <tr className="w-full flex items-center justify-between mb-10">
          <th className="">Note</th>
          <th className="">Denominators</th>
          <th className="">Total Amount</th>
        </tr>
      </thead>
      <tbody className="w-full flex flex-col gap-5">
        {notes &&
          notes.length > 0 &&
          notes.map((data, idx) => (
            <tr
              key={data.Id}
              className="w-full flex items-center justify-between"
            >
              <td align="center" className="text-xs">
                {data.Note_Value}
              </td>
              <td className="w-1/2">
                <Input
                  type={`number`}
                  placeholder="Enter denominator"
                  className="w-full"
                  value={denominators[idx]}
                  onChange={(e) => handleDenominatorChange(e, idx)}
                  disabled={
                    !outTable
                      ? (Number(denominators[idx]) === 0 &&
                          amountTobePaid - cashTransactionGrandTotal < 0) ||
                        amountTobePaid === 0
                      : amountTobePaid < data.Note_Value ||
                        (Number(denominators[idx]) === 0 &&
                          amountTobePaid - cashTransactionGrandTotal <
                            data.Note_Value)
                  }
                />
                {(outTable
                  ? Number(denominators[idx]) > 0 &&
                    (amountTobePaid < totalAmount[idx] ||
                      amountTobePaid < cashTransactionGrandTotal)
                  : Number(denominators[idx]) > 0 &&
                    amountTobePaid -
                      (cashTransactionGrandTotal - totalAmount[idx]) <=
                      data.Note_Value * (Number(denominators[idx]) - 1)) && (
                  <div className={`text-sm text-red-500`}>
                    <p className="text-sm text-destructive">
                      Please decrease denominator
                    </p>
                  </div>
                )}
              </td>
              <td className="text-xs" align="center">
                {totalAmount[idx]}
              </td>
            </tr>
          ))}

        <tr className="w-full grid grid-cols-3">
          <td></td>
          <td className="text-lg text-red-400 font-semibold" align="center">
            Grand total:-
          </td>
          {cashTransactionGrandTotal !== 0 && (
            <td className="text-base text-green-300 font-bold" align="center">
              {cashTransactionGrandTotal}
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};
export default CashDenomTable;
