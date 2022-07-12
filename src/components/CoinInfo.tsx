/** @format */

import {
  Box,
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { FC, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { useHistoricalChartQuery } from "../features/fetch-trending-coins/fetch-coins-slice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import localData from "../config/local-data";
import SelectButton from "./SelectButton";
import { CoinInfoProps } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  carouselLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CoinInfo: FC<CoinInfoProps> = ({ coinId }) => {
  const [days, setDays] = useState<number>(1);
  const { controlMoney } = useAppSelector((state) => state);
  const { data, isLoading } = useHistoricalChartQuery({
    id: coinId,
    days,
    currency: controlMoney.currency,
  });
  console.log(data);
  const basicData: any[] = data?.prices;

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.carouselLoading}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {basicData.length > 0 ? (
            <Line
              data={{
                labels: basicData.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: basicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${controlMoney.currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {localData.map((day: { value: number; label: string }) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </div>
      </ThemeProvider>
    );
  }
};

export default CoinInfo;
