import { Box, Button, TextField, colors, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextareaAutosize } from "@mui/base";
import MenuItem from "@mui/material/MenuItem";
import ImageUploading from "react-images-uploading";
import Header from "../../../components/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import { createCard } from "../../../../../actions/cards";
import { useDispatch, useSelector } from "react-redux";
import { TypeUser } from "../../../../../config/auth.js";
const FormEditProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isAvalilable, setIsAvalilable] = useState(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.cards);
  const { authData } = useSelector((state) => state.authReducer);
  const handleFormSubmit = (data) => {
    if (images.length && imagesPreview.length) {
      const dataSumbit = {
        ...data,
        avaliable: isAvalilable,
        img: images?.[0].data_url,
        img__grid: imagesPreview.map((item) => item.data_preview_url),
      };
      if (authData?.result?.role === TypeUser.SUPER_ADMIN) {
        dispatch(createCard(dataSumbit));
      } else {
        toast.warning("Only super admin can do this, you are admin");
      }
    } else {
      toast.warning("Image and Preview images are required.");
    }
  };

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onChangeImgPreview = (imageList) => {
    setImagesPreview(imageList);
  };

  const handleChangeSelect = (select) => {
    setIsAvalilable(select.target.value);
  };
  return (
    <Box m="20px">
      <Header title="ADD PRODUCT" subtitle="Add new product" />

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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sub title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subTitle}
                name="subTitle"
                error={!!touched.subTitle && !!errors.subTitle}
                helperText={touched.subTitle && errors.subTitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount Customer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.custom}
                name="custom"
                error={!!touched.custom && !!errors.custom}
                helperText={touched.custom && errors.custom}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.calendar}
                name="calendar"
                error={!!touched.calendar && !!errors.calendar}
                helperText={touched.calendar && errors.calendar}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost}
                name="cost"
                error={!!touched.cost && !!errors.cost}
                helperText={touched.cost && errors.cost}
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                value={isAvalilable}
                label="Avalilable"
                onChange={handleChangeSelect}
                // error={!!touched.avaliable && !!errors.avaliable}
                // helperText={touched.avaliable && errors.avaliable}
              >
                <MenuItem fullWidth value={true}>
                  Avalilable
                </MenuItem>
                <MenuItem fullWidth value={false}>
                  Not Avalilable
                </MenuItem>
              </Select>
              <TextareaAutosize
                variant="filled"
                type="text"
                placeholder="Description"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                minRows={10}
                style={{ gridColumn: "span 4", padding: "4px" }}
              />
              <Box style={{ gridColumn: "span 4" }}>
                <ImageUploading acceptType={["jpg", "jpeg", "png"]} value={images} onChange={onChange} maxNumber={1} dataURLKey="data_url">
                  {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                    <div className="upload__image-wrapper">
                      <Button onClick={onImageUpload} variant="contained" component="label" sx={{ background: colors.lightGreen }}>
                        Upload Brand Image
                      </Button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image["data_url"]} alt="" width="100" className="my-2" />
                          <div className="image-item__btn-wrapper gap-2 d-flex">
                            <Button onClick={() => onImageUpdate(index)} color="secondary" variant="outlined">
                              Change
                            </Button>
                            <Button onClick={() => onImageRemove(index)} color="secondary" variant="outlined">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </Box>
              <Box style={{ gridColumn: "span 4" }}>
                <ImageUploading
                  acceptType={["jpg", "jpeg", "png"]}
                  multiple
                  value={imagesPreview}
                  onChange={onChangeImgPreview}
                  maxNumber={8}
                  dataURLKey="data_preview_url"
                >
                  {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                    <div className="upload__image-wrapper">
                      <Button
                        onClick={onImageUpload}
                        variant="contained"
                        component="label"
                        sx={{ whiteSpace: "nowrap", background: colors.lightGreen }}
                      >
                        Upload Preview Images
                      </Button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image["data_preview_url"]} alt="" width="100" className="my-2" />
                          <div className="image-item__btn-wrapper gap-2 d-flex">
                            <Button onClick={() => onImageUpdate(index)} color="secondary" variant="outlined">
                              Change
                            </Button>
                            <Button onClick={() => onImageRemove(index)} color="secondary" variant="outlined">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button disabled={isLoading} type="submit" color="secondary" variant="contained">
                Add product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  location: yup.string().required("required"),
  age: yup.number().required("required"),
  subTitle: yup.string().required("required"),
  calendar: yup.date().required("required"),
  cost: yup.number().required("required"),
  custom: yup.number().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  title: "",
  location: "",
  age: "",
  calendar: "",
  subTitle: "",
  description: "",
  cost: "",
  custom: "",
  img: "",
  img__grid: "",
  avaliable: true,
};

export default FormEditProduct;
