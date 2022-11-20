import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];

function Featured() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        mt: "5%",
        maxWidth: "100vw",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: {
                    xs: "200px",
                    sm: "460px",
                    md: "530px",
                  },
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Featured;
