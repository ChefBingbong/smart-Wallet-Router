import { useCallback, useState } from "react";
import { TransactionBreakDownSteps } from "./Stepper";
import { ChevronDownIcon } from "@pancakeswap/uikit";
import type { SmartRouterTrade } from "@pancakeswap/smart-router";
import type {
  Currency,
  CurrencyAmount,
  Token,
  TradeType,
} from "@pancakeswap/swap-sdk-core";
import { LoadingSpinner } from "@saas-ui/react";

export const TransactionCard = ({
  fees,
  trade,
  inputValue,
}: {
  inputValue: string;
  fees: {
    gasCostInQuoteToken: CurrencyAmount<Currency>;
    gasCostInBaseToken: CurrencyAmount<Currency>;
    gasCostInNative: CurrencyAmount<Token>;
    gasCostInUSD: CurrencyAmount<Currency>;
    gasEstimate: CurrencyAmount<Currency>;
  };
  trade: SmartRouterTrade<TradeType> | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      className={`relative my-2 items-center rounded-md bg-gray-100 px-4 focus-within:bg-gray-200 ${isOpen ? "open" : "closed"}`}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={`flex w-full cursor-pointer items-center justify-between px-2 py-4 ${!fees || !trade ? "pointer-events-none" : ""}`}
        onClick={toggleAccordion}
      >
        <div className="font-semibold">Total Trade Cost</div>
        <div className="flex items-center justify-center gap-2">
          {trade && fees && (
            <div className="text-gray-500">{`${Number(trade?.outputAmount.toExact()).toFixed(3)} + ${Number(fees?.gasCostInQuoteToken.toExact()).toFixed(3)} = ${(Number(trade.outputAmount.toExact()) + Number(fees.gasCostInQuoteToken.toExact())).toFixed(3)} BUSD`}</div>
          )}
          {inputValue === "" && (
            <div className="text-gray-500">{"........"}</div>
          )}
          {inputValue !== "" ||
            !trade ||
            (!fees && <LoadingSpinner size="24px" />)}
          <ChevronDownIcon
            className="-mr-2"
            color="text-gray-400"
            width={25}
            height={25}
          />
        </div>
      </div>
      <div className="absolute left-0 h-[1px] w-full bg-gray-300" />
      <div className={`${!isOpen && "hidden"} w-full px-2 py-4 text-sm`}>
        <div className="mb-2 flex w-full justify-between">
          <div className="font-semibold">{"Gas in Cake"}</div>
          <div className="overflow-ellipsis text-gray-500">{`${Number(fees?.gasCostInBaseToken.toExact()).toFixed(5)} CAKE`}</div>
        </div>
        <div className="mb-2 flex w-full justify-between">
          <div className="font-semibold">{"Gas in BUSD"}</div>
          <div className="overflow-ellipsis text-gray-500">{`${Number(fees?.gasCostInQuoteToken.toExact()).toFixed(5)} BUSD`}</div>
        </div>
        <div className="mb-2 flex w-full justify-between">
          <div className="font-semibold">{"Gas in BNB"}</div>
          <div className="overflow-ellipsis text-gray-500">
            {`${Number(fees?.gasCostInNative.toExact()).toFixed(5)} BNB`}
          </div>
        </div>
        <div className="mb-2 flex w-full justify-between">
          <div className="font-semibold">{"Gas in USD"}</div>
          <div className="overflow-ellipsis text-gray-500">
            {`${Number(fees?.gasCostInUSD.toExact()).toFixed(2)} USD`}
          </div>
        </div>
        <TransactionBreakDownSteps />
      </div>
    </div>
  );
};
