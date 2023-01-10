import * as React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  IconButtonProps,
  MenuItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DrawerAppBarLayout from "../components/DrawerAppBarLayout";
import {
  Add,
  Create,
  Delete,
  DeleteForever,
  ModeOutlined,
  DeleteForeverOutlined,
  Close,
} from "@mui/icons-material";
import { Api } from "../hooks/useApi";

const drawerWidth = 240;

export default function MenuAdd() {
  // State Section
  const [categorys, setCategorys] = React.useState([]);
  const [file, setFile] = React.useState<any>();
  const [data, setData] = React.useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [edit, setEdit] = React.useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [cate, setCate] = React.useState({
    name: "",
  });

  const [id, setId] = React.useState();
  const [menus, setMenus] = React.useState<any>();
  const [load, setLoad] = React.useState(true);

  // Mount Section

  React.useEffect(() => {
    Api.get("/menus").then((res) => {
      setMenus(res.data.data.data);
      setLoad(false);
    });
    Api.get("/categorys").then((res) => setCategorys(res.data.data.data));
  }, [menus]);

  // Method Section
  const [opencate, setOpenCate] = React.useState(false);

  const [openedit, setOpenEdit] = React.useState(false);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, ["category"]: event.target.value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    Api.post("/menu", data);
    setOpen(false);
  };

  const handleOpenCate = () => {
    setOpenCate(true);
  };

  const handleCloseCate = () => {
    setOpenCate(false);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let image: any = event.target.files;
    let read = new FileReader();
    read.onload = (e) => {
      setData({ ...data, ["image"]: String(e.target?.result) });
    };
    read.readAsDataURL(image[0]);
    setFile(URL.createObjectURL(image[0]));
  };

  const handleAddCate = () => {
    Api.post("/category", cate).then((res: any) => {
      setOpen(false);
    });
  };

  const onDelMenu = async (id: any) => {
    await Api.delete(`/menu/${id}`);
  };

  const handleEdit = (id: any, data: any) => {
    console.log(data);
    setOpenEdit(true);
    setEdit(data);
    setId(id);
  };

  const onClose = () => {
    setOpenEdit(false);
  };

  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = () => {
    console.log(edit);
    Api.put(`/menu/${id}`, edit);
    setOpenEdit(false);
  };

  return (
    <div>
      <Head>
        <title>E-Sarn-Shabu</title>
        <meta name="description" content="Menu Add" />
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
            zIndex: 0,
          }}
        >
          <Toolbar />
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
              <Grid container spacing={2}>
                <Grid item xs={6} md={8} sx={{ mb: 1, mt: -3 }}>
                  <Typography variant="h5" sx={{ ml: 3, mt: 3 }}>
                    รายการอาหาร
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4} sx={{ mb: 1, mt: -1 }}>
                  <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 3, ml: 29 }}
                  >
                    <Add />
                    <Typography>เพิ่มเมนู</Typography>
                  </Button>
                  <Dialog
                    maxWidth="xl"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                      style: { borderRadius: 20 },
                    }}
                  >
                    <Card
                      sx={{
                        mx: "auto",
                        width: 900,
                        borderRadius: 5,
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <CardContent sx={{ ml: 5, textAlign:'center' }}>
                      <Typography>เพิ่มโปรโมชั่น</Typography>
                        <form action="#" onSubmit={handleSubmit}>
                          <Table aria-label="spanning table">
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  rowSpan={4}
                                  sx={{ textAlign: "center" }}
                                >
                                  {file ? (
                                    <div>
                                      <TableRow>
                                        <img
                                          src={file}
                                          style={{
                                            height: 250,
                                            width: 250,
                                            borderRadius: 5,
                                          }}
                                        ></img>
                                      </TableRow>
                                      <TableRow>
                                        <Button
                                          variant="outlined"
                                          component="label"
                                          size="small"
                                        >
                                          เปลี่ยนรูปภาพ
                                          <input
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                            onChange={handleImage}
                                          />
                                        </Button>
                                      </TableRow>
                                    </div>
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
                                </TableCell>
                                <TableCell className="table">
                                  ชื่ออาหาร
                                </TableCell>
                                <TableCell colSpan={6}>
                                  <TextField
                                    id="filled-basic"
                                    placeholder="ชาบูเล็ก"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    name="name"
                                    onChange={handleData}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>หมวดหมู่</TableCell>
                                <TableCell colSpan={2}>
                                  <TextField
                                    select
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    defaultValue=""
                                    label="เลือกหมวดหมู่"
                                    name="category"
                                  >
                                    {categorys.map((item: any) => (
                                      <MenuItem
                                        value={item.name}
                                        key={item.name}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={handleOpenCate}
                                  >
                                    <Add fontSize="inherit" />
                                  </IconButton>
                                  หมวดหมู่
                                </TableCell>
                              </TableRow>
                              <Dialog open={opencate} onClose={handleCloseCate}>
                                <DialogTitle>เพิ่มหมวดหมู่</DialogTitle>
                                <DialogContent>
                                  <TableCell>
                                    <TextField
                                      id="full-width-text-field"
                                      placeholder=""
                                      helperText=""
                                      margin="normal"
                                      fullWidth
                                      size="small"
                                      onChange={(e) =>
                                        setCate({ name: e.target.value })
                                      }
                                    />
                                  </TableCell>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={handleCloseCate}
                                    color="secondary"
                                  >
                                    ยกเลิก
                                  </Button>
                                  <Button
                                    onClick={handleAddCate}
                                    color="secondary"
                                  >
                                    เพิ่ม
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              <TableRow>
                                <TableCell>ราคา</TableCell>
                                <TableCell colSpan={2}>
                                  <TextField
                                    id="full-width-text-field"
                                    placeholder="200"
                                    helperText=""
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    name="price"
                                    onChange={handleData}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography>บาท</Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>รายการละเอียด</TableCell>
                                <TableCell colSpan={6}>
                                  <TextField
                                    id="full-width-text-field"
                                    placeholder="x1สามชั้น&#10;x1ผัก&#10;x1น้ำซุป&#10;x3น้ำจิ้ม"
                                    helperText=""
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    name="description"
                                    onChange={handleData}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <CardActions>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ mx: "auto", borderRadius: 3 }}
                              onClick={handleSubmit}
                            >
                              บันทึก
                            </Button>
                          </CardActions>
                        </form>
                      </CardContent>
                    </Card>
                  </Dialog>
                </Grid>
              </Grid>
            </Box>

            {categorys.map((cate: any) => (
              <div>
                <Paper
                  sx={{
                    borderRadius: 5,
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    height: 60,
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={8} sx={{ mb: 1, mt: -1 }}>
                      <Typography variant="h5" sx={{ ml: 3 }}>
                        {cate.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={2}
                >
                  {menus ? (
                    menus
                      .filter((item: any) => item.category.includes(cate.name))
                      .map((row: any) => (
                        <Card
                          sx={{
                            width: 300,
                            height: 250,
                            borderRadius: 5,
                            mb: 5,
                            m:2
                          }}
                        >
                          <>
                            <CardMedia
                              component="img"
                              height="150"
                              src={row.image}
                            />
                            <CardContent sx={{ mb: -7.5 }}>
                              <Typography>{row.name}</Typography>
                              <h2 style={{ margin: 0 }}>
                                {row.price} <span>Bath</span>
                              </h2>
                            </CardContent>
                            <CardActions disableSpacing>
                              <IconButton
                                onClick={(e) => handleEdit(row.id, row)}
                                aria-label="create"
                                sx={{
                                  left: "55%",
                                }}
                              >
                                <ModeOutlined
                                  sx={{
                                    fontSize: 25,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                  }}
                                >
                                  แก้ไข
                                </Typography>
                              </IconButton>

                              <Dialog
                                maxWidth="xl"
                                open={openedit}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                  style: { borderRadius: 20 },
                                }}
                              >
                                <Card
                                  sx={{
                                    mx: "auto",
                                    width: 900,
                                    borderRadius: 5,
                                    backgroundColor: "#f5f5f5",
                                  }}
                                >
                                  <CardContent sx={{ ml: 5 }}>
                                    <IconButton onClick={onClose}>
                                      <Close />
                                    </IconButton>
                                    <form action="#" onSubmit={handleSubmit}>
                                      <Table aria-label="spanning table">
                                        <TableBody>
                                          <TableRow>
                                            <TableCell
                                              rowSpan={4}
                                              sx={{ textAlign: "center" }}
                                            >
                                              <Card
                                                sx={{ width: 250, height: 250 }}
                                              >
                                                <img
                                                  src={edit.image}
                                                  style={{
                                                    height: 250,
                                                    width: 250,
                                                    borderRadius: 5,
                                                  }}
                                                ></img>
                                              </Card>
                                            </TableCell>
                                            <TableCell className="table">
                                              ชื่ออาหาร
                                            </TableCell>
                                            <TableCell colSpan={6}>
                                              <TextField
                                                id="filled-basic"
                                                value={edit.name}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                name="name"
                                                onChange={handleChangeEdit}
                                              />
                                            </TableCell>
                                          </TableRow>

                                          <TableRow>
                                            <TableCell>หมวดหมู่</TableCell>
                                            <TableCell colSpan={2}>
                                              <TextField
                                                select
                                                onChange={handleChange}
                                                size="small"
                                                fullWidth
                                                disabled
                                                label="เลือกหมวดหมู่"
                                                name="category"
                                                value={edit.category}
                                              >
                                                {categorys.map((item: any) => (
                                                  <MenuItem
                                                    value={item.name}
                                                    key={item.name}
                                                  >
                                                    {item.name}
                                                  </MenuItem>
                                                ))}
                                              </TextField>
                                            </TableCell>
                                          </TableRow>

                                          <TableRow>
                                            <TableCell>ราคา</TableCell>
                                            <TableCell colSpan={2}>
                                              <TextField
                                                id="full-width-text-field"
                                                placeholder="200"
                                                helperText=""
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                                name="price"
                                                value={edit.price}
                                                onChange={handleChangeEdit}
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <Typography>บาท</Typography>
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell>รายการละเอียด</TableCell>
                                            <TableCell colSpan={6}>
                                              <TextField
                                                id="full-width-text-field"
                                                placeholder="x1สามชั้น&#10;x1ผัก&#10;x1น้ำซุป&#10;x3น้ำจิ้ม"
                                                helperText=""
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                                name="description"
                                                onChange={handleChangeEdit}
                                                value={edit.description}
                                              />
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                      <CardActions>
                                        <Button
                                          variant="contained"
                                          color="success"
                                          size="small"
                                          sx={{ mx: "auto", borderRadius: 3 }}
                                          onClick={(e) => handleEditSubmit()}
                                        >
                                          บันทึก
                                        </Button>
                                      </CardActions>
                                    </form>
                                  </CardContent>
                                </Card>
                              </Dialog>
                              <IconButton
                                onClick={(e) => onDelMenu(row.id)}
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
                          </>
                        </Card>
                      ))
                  ) : (
                    <></>
                  )}
                </Grid>
              </div>
            ))}
          </Card>
        </Box>
      </Box>
    </div>
  );
}
function makeStyles(
  arg0: (theme: any) => {
    button: {
      [x: number]: {
        minWidth: number;
        paddingLeft: number;
        paddingRight: number;
        "& .MuiButton-startIcon": { margin: number };
      };
      margin: any;
    };
    buttonText: { [x: number]: { display: string } };
  }
) {
  throw new Error("Function not implemented.");
}
function setExpanded(arg0: boolean) {
  throw new Error("Function not implemented.");
}
