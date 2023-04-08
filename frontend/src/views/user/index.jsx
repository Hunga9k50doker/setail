import { Box, Button, TextField, Typography, colors } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile, updatePassword } from "../../actions/auth";
import Helmet from "../../components/Helmet/Helmet";
import { toast } from "react-toastify";
const FormUser = () => {
  const { authData, isLoading } = useSelector((state) => state.authReducer);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setInitialValues] = useState(authData.result);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    dispatch(updateProfile(values, history));
  };

  const handleFormSubmitPassword = (values) => {
    const dataSubmit = {
      ...values,
      _id: initialValues?._id,
    };
    if (values.newpassword !== values.comfirmpassword) {
      return toast.warning("New password not match.");
    }
    dispatch(updatePassword(dataSubmit, history));
  };

  return (
    <Helmet title="Profile">
      <Box mx="20px" my={12}>
        <Box mb="30px">
          <Typography variant="h4" color={colors.blueGrey[900]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
            User
          </Typography>
          <Typography variant="h5" color={colors.blueGrey[900]}>
            Manager profile user
          </Typography>
        </Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" mb={"20px"}>
                <Button disabled={isLoading} type="submit" color="secondary" variant="contained">
                  Update profile
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        {/* password */}
        <Box mb="30px">
          <Typography variant="h5" color={colors.blueGrey[900]}>
            Manager password
          </Typography>
        </Box>
        <Formik onSubmit={handleFormSubmitPassword} initialValues={initialValuePassword} validationSchema={checkoutPassSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Current Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newpassword}
                  name="newpassword"
                  error={!!touched.newpassword && !!errors.newpassword}
                  helperText={touched.newpassword && errors.newpassword}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Comfirm New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comfirmpassword}
                  name="comfirmpassword"
                  error={!!touched.comfirmpassword && !!errors.comfirmpassword}
                  helperText={touched.comfirmpassword && errors.comfirmpassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button disabled={isLoading} type="submit" color="secondary" variant="contained">
                  Update password
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Helmet>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});

const checkoutPassSchema = yup.object().shape({
  password: yup.string().min(6).required("The password must be at least 6 characters long"),
  newpassword: yup.string().min(6).required("The newpassword must be at least 6 characters long"),
  comfirmpassword: yup.string().required("required"),
});

const initialValuePassword = {
  password: "",
  newpassword: "",
  comfirmpassword: "",
};
export default FormUser;
