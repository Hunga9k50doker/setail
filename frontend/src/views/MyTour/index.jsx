import { Box, Button, TextField, Typography, colors, useTheme, Modal } from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile, updatePassword } from "../../actions/auth";
import Helmet from "../../components/Helmet/Helmet";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { numberWithCommas } from "../../utils/utils";
// import Header from "../../components/Header";
import { getTours } from "../../actions/tours";
import Loading from "../../components/loading";
import { GET_TOUR_BY_ID } from "../../constants/actionTypes";
import { TypeUser } from "../../config/auth.js";
import moment from "moment";

const MyTour = () => {
  const { authData } = useSelector((state) => state.authReducer);
  const { tours, isLoading } = useSelector((state) => state.tours);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const history = useHistory();
  const dispatch = useDispatch();

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone number",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Departure date",
      flex: 1,
      renderCell: (value) => moment(value).format("DD-MM-YYYY"),
    },
    {
      field: "numberTikets",
      headerName: "Number tikets",
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
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
    //         <Box color={colors.grey[100]} sx={{ ml: "5px", fontSize: "20px" }} className="d-flex gap-2">
    //           <div onClick={() => handleEditClick(row)} style={{ cursor: "pointer" }}>
    //             <EditIcon />
    //           </div>
    //           <div onClick={() => handleOpen(row)} style={{ cursor: "pointer" }}>
    //             <DeleteIcon />
    //           </div>
    //         </Box>
    //       </Box>
    //     );
    //   },
    // },
  ];

  // const handleEditClick = (item) => {
  //   dispatch({ type: GET_TOUR_BY_ID, payload: { card: item } });
  //   history.push(`/admin/product/edit/${item._id}`);
  // };
  // const handleAdd = () => {
  //   history.push("/admin/product/add");
  // };

  //  const handleDeleteClick = () => {
  //    if (authData?.result?.role === TypeUser.SUPER_ADMIN) {
  //      dispatch(deleteCard(data._id));
  //    } else {
  //      toast.warning("Only super admin can do this, you are admin");
  //    }
  //    setOpen(false);
  //  };

  useEffect(() => {
    dispatch(getTours({ userId: authData.result.id }));
  }, []);

  return (
    <Helmet title="My tour">
      <Box m="20px">
        <Box mb="30px" mt={12}>
          <Typography variant="h3" color={colors.cyan["A700"]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
            Your Tour
          </Typography>
          <Typography variant="h5" color={colors.cyan["A700"]}>
            Managing your tour
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {tours.length === 0 ? (
                <div className="d-flex flex-column align-items-center gap-2">
                  <p className="text-center">You don't have any tour</p>
                  <Button variant="outlined" onClick={() => history.push("/")}>
                    Book now
                  </Button>
                </div>
              ) : (
                <DataGrid checkboxSelection rows={tours} columns={columns} getRowId={(row) => row._id} />
              )}
            </>
          )}
        </Box>
      </Box>
      {/* <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
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
        </Modal> */}
    </Helmet>
  );
};

export default MyTour;
