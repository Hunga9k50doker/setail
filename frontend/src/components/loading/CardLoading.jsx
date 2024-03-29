import React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
const CardLoading = () => {
  return (
    <Grid container rowSpacing={2}>
      {Array.from(new Array(12)).map((item, index) => (
        <Grid key={index} item xs={3}>
          <Skeleton variant="rectangular" width={306} height={320} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardLoading;
