import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
export const GridSystem = ({ children, columns, rows, rowSize, ...rest }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <Grid
      gridAutoRows={rowSize}
      templateRows={`repeat(${rows}, 1fr)`}
      templateColumns={`repeat(${columns}, 1fr)`}
      {...rest}
    >
      {childrenArray.map((child, index) => {
        return (
          <GridItem
            rowSpan={child.rowSpan}
            colSpan={child.colSpan}
            gridColumnStart={child.columnStart}
            gridColumnEnd={child.columnEnd}
            gridRowStart={child.rowStart}
            gridRowEnd={child.rowEnd}
            key={index}
            sx={{
              "> div": {
                h: "100%",
              },
            }}
          >
            {child}
          </GridItem>
        );
      })}
    </Grid>
  );
};
