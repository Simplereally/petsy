"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({ decimal = 0, amount }: { decimal?: number; amount: number }) => {
  return (
    <div className="w-full">
      <CountUp decimals={decimal} decimal="." prefix="" end={amount} />
    </div>
  );
};

export default AnimatedCounter;
