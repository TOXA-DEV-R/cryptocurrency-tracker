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
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

interface DataTypes {
  image: string;
  name: string;
  id: string;
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
          {(data as DataTypes[]).map((item) => (
            <SwiperSlide
              className={classes.carouselItem}
              onClick={() => navigate(`/coins/${item.id}`)}
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                height={80}
                style={{
                  marginBottom: 10,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

export default Carousel;
