/** @format */

import { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Container } from "@mui/material";

const useStaye = makeStyles(() => ({
  banner: {
    backgroundImage: "url(src/assets/image/banner.jpg)",
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Banner: FC = () => {
  const classes = useStaye();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
