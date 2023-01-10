import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import DrawerAppBarLayout from "../components/DrawerAppBarLayout";
import Head from "next/head";
import styled from "@emotion/styled";
import {
  Card,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const drawerWidth = 240;

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MenuList() {
  const [menus, setMenus] = React.useState<any>();
  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://54.65.246.76/menus").then((res) => {
      setMenus(res.data.data.data);
      setLoad(false);
    });
  }, [menus]);

  return (
    <div>
      <Head>
        <title>E-Sarn-Shabu</title>
        <meta name="description" content="Menu List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerAppBarLayout />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {load ? (
            <Box sx={{ width: "100%", mb: load ? 1 : 0 }}>
              <LinearProgress color="secondary" />
            </Box>
          ) : (
            <></>
          )}
          <Card
          sx={{
            minWidth: 1100,
            borderRadius: 5,
            padding: 2,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            ml: 2,
          }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ mx: "auto", backgroundColor: "#f5f5f5" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "#FF2828" }}
                  >
                    รูปภาพ
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "#FF2828" }}
                  >
                    รายการ
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "#FF2828" }}
                  >
                    หมวดหมู่
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "#FF2828" }}
                  >
                    ราคา
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ backgroundColor: "#FF2828" }}
                  >
                    รายละเอียด
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menus ? (
                  menus.map((row: any) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ padding: 0, mt: "2", textAlign: "center" }}
                      >
                        <img
                          style={{ width: 40, height: 40 }}
                          src={row.image}
                        ></img>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
