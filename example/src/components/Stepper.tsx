import { Steps, StepsItem, StepsCompleted } from "@saas-ui/react";

import {
  Box,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Flex,
} from "@chakra-ui/react";

const steps = [
  {
    name: "step 1",
    title: "Approve SW",
  },
  {
    name: "step 2",
    title: "Transfer to SW",
  },
  {
    name: "step 3",
    title: "Transfer Fee",
  },
  {
    name: "step 4",
    title: "Approve Router",
  },
  {
    name: "step 5",
    title: "Execute Trade",
  },
  {
    name: "step 6",
    title: "Execute Trade",
  },
];

export function TransactionBreakDownSteps() {
  return (
    <Steps
      step={5}
      // width="120%"
      colorScheme="indigo"
      color="indigo"
      position="absolute"
      left={1.5}
    >
      {steps.map((step, i) => (
        <StepsItem
          position="relative"
          flexDirection="column"
          key={`${step.name}-index`}
          {...step}
          render={() => (
            <>
              <StepSeparator
                style={{
                  position: "absolute",
                  width: "90%",
                  height: "1px",
                  top: "48px",
                  background: "#6586df",
                  zIndex: 0,
                }}
              />

              <Step
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "120px",
                  minHeight: "120px",
                }}
              >
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="1">
                  <StepTitle style={{ fontSize: "11px" }}>
                    {step.title}
                  </StepTitle>
                </Box>
              </Step>
            </>
          )}
        />
      ))}
    </Steps>
  );
}
