import React from "react";
import PriceStep1 from "../../assets/pictures/price/PriceStep1.svg";
import PriceStep2 from "../../assets/pictures/price/PriceStep2.svg";
import PriceStep3 from "../../assets/pictures/price/PriceStep3.svg";
import PriceStep4 from "../../assets/pictures/price/PriceStep4.svg";
import PriceStep5 from "../../assets/pictures/price/PriceStep5.svg";

const PricingStep = ({ stepState }) => {
  return (
    <>
      {stepState === 1 && <img src={PriceStep1} />}
      {stepState === 2 && <img src={PriceStep2} />}
      {stepState === 3 && <img src={PriceStep3} />}
      {stepState === 4 && <img src={PriceStep4} />}
      {stepState === 5 && <img src={PriceStep5} />}
    </>
  );
};

export default PricingStep;
