/** @format */

import { Typography } from "@material-ui/core";
import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <Typography
      style={{
        textTransform: "uppercase",
        fontFamily: "'Montserrat', sans-serif",
        textAlign: "center",
        paddingBottom: 20,
      }}
    >
      This project created with typescript
    </Typography>
  );
};

export default Footer;
