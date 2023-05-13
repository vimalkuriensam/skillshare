import React from "react";
import { Icon, Title } from "../../atoms";

const Stepper = ({ steps = [], currentStep = 1 }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className="u-align-center">
          <div className="stepper__container">
            <div
              className={`stepper__index ${
                currentStep == index + 1
                  ? "stepper__index--current"
                  : currentStep > index + 1
                  ? "stepper__index--past"
                  : "stepper__index--inactive"
              }`}
            >
              {currentStep <= index + 1 ? (
                <Title
                  variant={`${currentStep <= index ? "alb-16-1" : "alb-16-2"}`}
                >
                  {index + 1}
                </Title>
              ) : (
                <Icon name="Tick" />
              )}
            </div>
            <div className="stepper__title">
              <Title variant="alb-16-1">{step}</Title>
            </div>
          </div>
          <div className="stepper__line">&nbsp;</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
