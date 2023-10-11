import {
  Box,
  Button,
  Typography,
  colors,
  Modal,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import { DataGrid } from "@mui/x-data-grid";
import { numberWithCommas } from "../../utils/utils";
import { getCartByUserId, deleteCart, updateCart } from "../../actions/carts";
import Loading from "../../components/loading";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";

const MyCart = () => {
  const { authData } = useSelector((state) => state.authReducer);
  const { cart, isLoading } = useSelector((state) => state.carts);
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const columns = [
    {
      field: "img",
      headerName: "",
      renderCell: ({ row }) => {
        return (
          <img width={50} height={50} alt="not found" src={row.product.img} />
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: ({ row }) => {
        return <p>{row.product.title}</p>;
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (value) => moment(value).format("DD-MM-YYYY HH:mm a"),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total($)",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (value) => {
        return numberWithCommas(+value.value, "TOTAL");
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Box
              color={colors.grey[800]}
              sx={{ ml: "5px", fontSize: "20px" }}
              className="d-flex gap-2"
            >
              <div
                onClick={() => handleOpenEdit(row)}
                style={{ cursor: "pointer" }}
              >
                <EditIcon />
              </div>
              <div
                onClick={() => handleOpen(row)}
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </div>
            </Box>
          </Box>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const handleOpen = (item) => {
    setData(item);
    setOpen(true);
  };

  const handleOpenEdit = (item) => {
    setData(item);
    setOpenEdit(true);
  };

  const handleEditClick = () => {
    if (+data.quantity <= 0)
      return toast.warn("Quantity must be greater than 0");

    dispatch(
      updateCart(data.product._id, {
        quantity: +data.quantity,
        userId: authData.result._id,
      })
    );
    setOpenEdit(false);
  };

  const handleDeleteClick = () => {
    dispatch(
      deleteCart({
        productId: data.product._id,
        userId: authData.result._id,
      })
    );
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCartByUserId({ userId: authData.result._id }));
  }, []);

  return (
    <Helmet title="My tour">
      <Box m="20px">
        <Box mb="30px" mt={12}>
          <Typography
            variant="h3"
            color={colors.cyan["A700"]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            Your Cart
          </Typography>
          <Typography variant="h5" color={colors.cyan["A700"]}>
            Managing your cart
          </Typography>
        </Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.cyan[50],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.cyan[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.cyan[50],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.cyan[100],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.common["white"]} !important`,
            },
          }}
        >
          {isLoading && <Loading />}

          {
            <>
              {cart.totalCount === 0 && !isLoading && (
                <div className="d-flex flex-column align-items-center gap-2">
                  <p className="text-center">You don't have any tour</p>
                  <Button
                    variant="outlined"
                    onClick={() => history.push("/shop/products")}
                  >
                    Shopping now!
                  </Button>
                </div>
              )}
              {cart.totalCount > 0 && !isLoading && (
                <DataGrid
                  checkboxSelection
                  rows={cart.items}
                  columns={columns}
                  getRowId={(row) => row._id}
                />
              )}
            </>
          }
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h3 id="parent-modal-title " className="text-center mb-4">
            Do you want delete?
          </h3>
          <div className="d-flex align-items-center justify-content-end">
            <Button onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h3 id="parent-modal-title " className="text-center mb-4">
            Edit quantity
          </h3>
          <TextField
            fullWidth
            type="number"
            inputProps={{
              min: 1,
              max: 99,
              maxLength: 2,
            }}
            value={data?.quantity}
            onChange={(e) => {
              setData({ ...data, quantity: e.target.value });
            }}
          ></TextField>
          <div className="d-flex align-items-center justify-content-end">
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEditClick}>Update</Button>
          </div>
        </Box>
      </Modal>
    </Helmet>
  );
};

export default MyCart;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
