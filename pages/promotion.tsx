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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  IconButtonProps,
  LinearProgress,
  Paper,
  Stack,
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
import axios from "axios";
import { red } from "@mui/material/colors";
import { Api } from "../hooks/useApi";

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

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MenuList() {
  // State Section
  const [data, setData] = React.useState({ image: "", name: "" });
  const [open, setOpen] = React.useState(false);
  const [promotion, setPromotion] = React.useState([]);
  const [file, setFile] = React.useState<any>();

  // Mount Section
  React.useEffect(() => {
    Api.get("/promotions").then((res) => {
      setPromotion(res.data.data.data);
    });
  }, [promotion]);

  // Method Section
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let image: any = event.target.files;
    let read = new FileReader();
    read.onload = (e) => {
      setData({ ...data, ["image"]: String(e.target?.result) });
    };
    read.readAsDataURL(image[0]);
    setFile(URL.createObjectURL(image[0]));
  };

  const handleAddPromotion = () => {
    if (data) {
      Api.post("/promotion", data).then((res) => {
        setOpen(false);
      });
    }
  };

  const onDelPromo = async (id: any) => {
    await Api.delete(`/promotion/${id}`);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            width: { sm: `calc(100% - ${drawerWidth}px)`, zIndex: 2 },
          }}
        >
          <Toolbar />
          <Box sx={{ flexGrow: 1 }}>
            <Card
              sx={{
                minWidth: 1100,
                borderRadius: 5,
                padding: 2,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                ml: 2,
              }}
            >
              <Box sx={{ mt: 2, mb: 2 }}>
                <Paper
                  sx={{
                    borderRadius: 5,
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    height: 60,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={8} sx={{ mb: 1 }}>
                      <Typography variant="h5" sx={{ ml: 3 }}>
                        โปรโมชั่น
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ mb: 1, mt: -1 }}>
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 3, ml: 23 }}
                      >
                        <Add />
                        <Typography>เพิ่มโปรโมชั่น</Typography>
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                          style: { borderRadius: 20 },
                        }}
                      >
                        <CardContent
                          sx={{ width: 500,  borderRadius: 5,
                          textAlign: 'center' }}
                        >
                          <Typography sx={{ mb: 3 }}>เพิ่มโปรโมชั่น</Typography>
                          <div style={{ textAlign: "center" }}>
                            {file ? (
                              <>
                                <div>
                                  <img
                                    src={file}
                                    style={{
                                      height: 250,
                                      width: 250,
                                      borderRadius: 5,
                                    }}
                                  ></img>
                                </div>
                                <Button variant="outlined" 
                                component="label"
                                size="small">
                                  เปลี่ยนรูปภาพ
                                  <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={handleImage}
                                  />
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outlined"
                                size="large"
                                sx={{ height: 250, width: 250 }}
                                component="label"
                              >
                                เพิ่มรูปภาพ
                                <input
                                  hidden
                                  accept="image/*"
                                  multiple
                                  type="file"
                                  onChange={handleImage}
                                />
                              </Button>
                            )}
                          </div>
                          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <Typography sx={{ mt: 1, width: 120, mb:2}}>
                              ชื่อโปรโมชั่น
                            </Typography>
                            <TextField
                              id="outlined"
                              variant="outlined"
                              name="name"
                              size="small"
                              fullWidth
                              sx={{mb:2}}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  ["name"]: String(e.target?.value),
                                })
                              }
                            />
                          </Stack>
                          <Button
                            onClick={handleAddPromotion}
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ mx: "auto", borderRadius: 3,
                          }}
                          >
                            บันทึก
                          </Button>
                        </CardContent>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                {promotion &&
                  promotion.map((promotion: any) => (
                    <Card sx={{ width: 300, height: 210, borderRadius: 5, m:2}}>
                      <CardMedia
                        src={promotion.image}
                        component="img"
                        height="150"
                        alt="Paella dish"
                      />
                      <CardContent sx={{ mb: -7.5 }}>
                        <Typography>{promotion.name}</Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton
                          onClick={(e) => onDelPromo(promotion.id)}
                          aria-label="DeleteForever"
                          sx={{
                            color: "#FF2828",
                            ml: "auto",
                          }}
                        >
                          <DeleteForeverOutlined
                            sx={{
                              fontSize: 25,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: 15,
                            }}
                          >
                            ลบ
                          </Typography>
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
              </Grid>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
