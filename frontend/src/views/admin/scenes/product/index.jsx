import { Box, Button, useTheme, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Header from "../../components/Header";
import { getCards, deleteCard } from "../../../../actions/cards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import { GET_CARD_BY_ID } from "../../../../constants/actionTypes";
import { TypeUser } from "../../../../config/auth.js";
import { toast } from "react-toastify";
import moment from "moment";
const Product = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const { authData } = useSelector((state) => state.authReducer);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
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

  const columns = [
    {
      headerName: "",

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
            <img src={row.img} alt="" width={40} height={40} loading="lazy" />
          </Box>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "custom",
      headerName: "Amount Custom",
      flex: 0.5,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
    },
    {
      field: "calendar",
      headerName: "Calendar",
      flex: 0.5,

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
            {moment(row.calendar).format("DD/MM/YYYY")}
          </Box>
        );
      },
    },
    {
      field: "subTitle",
      headerName: "Description",
      flex: 1,
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
              color={colors.grey[100]}
              sx={{ ml: "5px", fontSize: "20px" }}
              className="d-flex gap-2"
            >
              <div
                onClick={() => handleEditClick(row)}
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

  const handleOpen = (item) => {
    setData(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleEditClick = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/admin/product/edit/${item._id}`);
  };
  const handleAdd = () => {
    history.push("/admin/product/add");
  };

  const handleDeleteClick = () => {
    if (authData?.result?.role === TypeUser.SUPER_ADMIN) {
      dispatch(deleteCard(data._id));
    } else {
      toast.warning("Only super admin can do this, you are admin");
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCards);
  }, []);

  return (
    <>
      <Box m="20px">
        <Header title="PRODUCT" subtitle="Managing the Products" />
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
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {cards?.isLoading ? (
            <Loading />
          ) : (
            <>
              <Button
                sx={{ mb: "8px", background: colors.greenAccent[400] }}
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Add Product
              </Button>
              <DataGrid
                checkboxSelection
                rows={cards.cards}
                columns={columns}
                getRowId={(row) => row?._id || row?.title}
              />
            </>
          )}
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
            <Button onClick={handleDeleteClick} sx={{ color: "white" }}>
              Delete
            </Button>
            <Button onClick={handleClose} sx={{ color: "white" }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Product;
