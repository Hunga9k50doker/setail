import { Box, Button, Typography, colors } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import { DataGrid } from "@mui/x-data-grid";
import { numberWithCommas } from "../../utils/utils";
import { getTours } from "../../actions/tours";
import Loading from "../../components/loading";
import moment from "moment";

const MyTour = () => {
  const { authData } = useSelector((state) => state.authReducer);
  const { tours, isLoading } = useSelector((state) => state.tours);
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
  ];

  useEffect(() => {
    dispatch(getTours({ userId: authData.result.id }));
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
                <DataGrid
                  checkboxSelection
                  rows={tours}
                  columns={columns}
                  getRowId={(row) => row._id}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </Helmet>
  );
};

export default MyTour;
