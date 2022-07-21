/** @format */

import { makeStyles } from "@material-ui/core";
import { FC } from "react";
import { useTrendingCoinsQuery } from "../../features/fetch-trending-coins/fetch-coins-slice";
import { useAppSelector } from "../../app/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CircularProgress, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper";
import { numberWithCommas } from "../../helper/number-with-commas";

const useStyles = makeStyles(() => ({
  carouselLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase",
    color: "white",
  },
}));

interface DataTypes {
  image: string;
  name: string;
  id: string;
  symbol: string;
  market_cap_change_percentage_24h: number;
  current_price: number;
}

const Carousel: FC = () => {
  const classes = useStyles();
  const { controlMoney } = useAppSelector((state) => state);
  const { data = [], isLoading } = useTrendingCoinsQuery(controlMoney.currency);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box className={classes.carouselLoading}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <div className={classes.carousel}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2500,
          }}
          modules={[Autoplay]}
          className="basic-carousel"
        >
          {(data as DataTypes[]).map((coin) => {
            const profit: boolean = coin.market_cap_change_percentage_24h >= 0;

            return (
              <SwiperSlide className={classes.carouselItem} key={coin.id}>
                <div
                  style={{
                    width: 150,
                    marginBottom: 10,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                  onClick={() => navigate(`/coins/${coin.id}`)}
                >
                  {" "}
                  <img src={coin.image} alt={coin.name} height={80} />
                  <span>
                    {coin.symbol} &nbsp;
                    <span
                      style={{
                        color: profit ? "rgb(14,203,129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {coin.market_cap_change_percentage_24h.toFixed(2)}%
                    </span>
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {controlMoney.symbol}{" "}
                    {numberWithCommas(coin.current_price.toFixed(2))}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
};

export default Carousel;
