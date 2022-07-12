/** @format */

import {
  Box,
  CircularProgress,
  Container,
  createTheme,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useCoinsListQuery } from "../features/fetch-trending-coins/fetch-coins-slice";
import { numberWithCommas } from "../helper/number-with-commas";
import { CoinsTableDataTypes } from "../types";

const useStyles = makeStyles(() => ({
  carouselLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinsTable: FC = () => {
  const [search, setSearch] = useState<string>("");
  const { controlMoney } = useAppSelector((state) => state);
  const { data, isLoading } = useCoinsListQuery(controlMoney.currency);
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();
  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = (): CoinsTableDataTypes[] | [] => {
    if (data) {
      return data.filter(
        (coin: { name: string; symbol: string }) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    } else {
      return [];
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
        <TableContainer>
          {isLoading ? (
            <Box className={classes.carouselLoading}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map(
                    (item: string, index: number) => {
                      return (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: 700,
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                          align={item === "Coin" ? "left" : "right"}
                          key={index}
                        >
                          {item}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((item) => {
                    const profit = item.market_cap_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        className={classes.row}
                        key={item.id}
                        onClick={() => navigate(`/coins/${item.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img src={item.image} alt={item.name} height={50} />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {item.symbol}
                            </span>
                            <span style={{ color: "dark" }}>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {controlMoney.symbol}{" "}
                          {numberWithCommas(item.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {item.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {controlMoney.symbol}{" "}
                          {numberWithCommas(
                            item.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={handleSearch().length / 10}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
