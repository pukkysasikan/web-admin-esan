import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import DrawerAppBarLayout from "../components/DrawerAppBarLayout";
import Head from "next/head";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  Add,
  Delete,
  Favorite,
  MoreVert,
  Share,
  Create,
  Label,
  DeleteForeverOutlined,
  ModeOutlined,
  Folder,
  Pageview,
  LockPersonOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Api } from "../hooks/useApi";
import { useRouter } from "next/router";

const drawerWidth = 240;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function MenuList() {
  const router = useRouter()
  const [data, setData] = React.useState({
    username : "",
    password : ""
  })
  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onLogin = ()=>{
    Api.post("/login", data).then((res:any)=>{
      localStorage.setItem("Logged",res.data.msg)
      router.push("/menu_add")
    })
  }

  React.useEffect(()=>{
    if (localStorage.getItem("Logged")){
      router.push("/menu_add")
    }
  },[])

  return (
    <div>
      <Head>
        <title>E-Sarn-Shabu</title>
        <meta name="description" content="Menu List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)`, zIndex: 2 },
          }}
        >
          <Toolbar />
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 400,
                  height: 400,
                  ml: "auto",
                  mr: "auto",
                },
              }}
            >
              <Paper elevation={0} sx={{ borderRadius: 5, textAlign:'center' }}>
              <Avatar sx={{ bgcolor: '#f44336',
                width:100,
                height:100,
                mt:-5,
                ml:'auto',
                mr:'auto',
                mb:3 }}>
                    <LockPersonOutlined
                    sx={{
                    width:80,
                    height:80,
                     }}/>
                  </Avatar>
                <Typography
                  sx={{
                    textAlign: "center",
                    mb: 5,
                    mt: 5,
                  }}
                >

                  Login For Admin E-San Shabu
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  size="small"
                  name="username"
                  onChange={handleData}
                  sx={{ mt: 2, mb: 3 }}
                />

                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  size="small"
                  type="password"
                  name="password"
                  onChange={handleData}
                  sx={{ mt: 2 }}
                />
                <br/>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, borderRadius: 5 }}
                  onClick={onLogin}
                >
                  Login
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
function setOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setData(arg0: any) {
  throw new Error("Function not implemented.");
}
