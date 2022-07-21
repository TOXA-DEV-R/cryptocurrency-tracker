/** @format */

import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FC } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { useSingleCoinQuery } from "../features/fetch-trending-coins/fetch-coins-slice";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { numberWithCommas } from "../helper/number-with-commas";
import { useGlobalContext } from "../context/context";
import { Button } from "@mui/material";
import { addWatchList } from "../features/watch-list/watch-list";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { controlAlertModal } from "../features/alert-modal/alert-modal-slice";

const useStyles = makeStyles((theme) => ({
  carouselLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleCoinQuery(String(id));
  const classes = useStyles();
  const { controlMoney, watchList, alertModal } = useAppSelector(
    (state) => state
  );
  const { user } = useGlobalContext();
  const dispatch = useAppDispatch();

  const inWatchList = watchList.includes(data?.id);

  const getIdForWatchList = async (): Promise<void> => {
    const coinRef = doc(db, "watchList", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, data.id] : [data?.id],
      });

      dispatch(addWatchList(data?.id));
      dispatch(
        controlAlertModal({
          open: true,
          message: `${data?.name} Added to the WatchList !`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        controlAlertModal({
          open: true,
          message: `${data?.message}`,
          type: "error",
        })
      );
    }
  };

  if (isLoading) {
    return (
      <Box className={classes.carouselLoading}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <div className={classes.container}>
        <aside className={classes.sidebar}>
          <img
            src={data.image ? data.image?.large : ""}
            height="200"
            style={{
              marginBottom: 20,
            }}
            alt={data.name}
          />
          <Typography variant="h3" className={classes.heading}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {parse(data.description.en.split(". ")[0])}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {data.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {controlMoney.symbol}{" "}
                {numberWithCommas(
                  data.market_data.current_price[
                    controlMoney.currency.toLowerCase()
                  ].toString()
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {controlMoney.symbol}{" "}
                {numberWithCommas(
                  data.market_data.market_cap[
                    controlMoney.currency.toLowerCase()
                  ]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
            {user && (
              <Button
                sx={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "#EEBC1D",
                }}
                onClick={getIdForWatchList}
              >
                {`${
                  inWatchList ? "Remove from Watchlist" : "Add to WatchList"
                }`}
              </Button>
            )}
          </div>
        </aside>
        <CoinInfo coinId={data.id} />
      </div>
    );
  }
};

export default CoinPage;
