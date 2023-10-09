import {
  Box,
  Button,
  TextField,
  colors,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextareaAutosize } from "@mui/base";
import ImageUploading from "react-images-uploading";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../../../../../actions/products";
import { useDispatch, useSelector } from "react-redux";
import { TypeUser } from "../../../../../config/auth.js";
const FormEditProduct = () => {
  const MAX_SIZE_IMG = 1024 * 1024 * 5; // 5MB
  const MAX_SIZE_IMG_PREVIEW = 1024 * 1024 * 2; // 2MB
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isAvalilable, setIsAvalilable] = useState(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const { authData } = useSelector((state) => state.authReducer);
  const handleFormSubmit = (data) => {
    if (images.length) {
      const dataSumbit = {
        ...data,
        avaliable: isAvalilable,
        img: {
          name: images?.[0].file.name,
          type: images?.[0].file.type,
          url: images?.[0].data_url,
        },
        img__grid:
          imagesPreview.length > 0
            ? imagesPreview.map((item) => ({
                url: item.data_preview_url,
                name: item.file.name,
                type: item.file.type,
              }))
            : [],
      };
      if (authData?.result?.role === TypeUser.SUPER_ADMIN) {
        dispatch(createProduct(dataSumbit));
      } else {
        toast.warning("Only super admin can do this, you are admin");
      }
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

  useEffect(() => {
    if (images?.length && images[0].size > MAX_SIZE_IMG) {
      toast.warning("Image size is too large. Max size is 5MB");
    }
    if (imagesPreview?.length) {
      imagesPreview.forEach((item) => {
        if (item.size > MAX_SIZE_IMG_PREVIEW) {
          toast.warning("Image size is too large. Max size is 2MB");
          return;
        }
      });
    }
  }, [images, imagesPreview]);

  return (
    <Box m="20px">
      <Header title="ADD PRODUCT" subtitle="Add new product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
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
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  sx={{ gridColumn: "span 2" }}
                  labelId="demo-simple-select-label"
                  name="category"
                  value={values.category}
                  label="Category"
                  onChange={handleChange}
                  error={!!touched.category && !!errors.category}
                  variant="filled"
                  fullWidth
                >
                  <MenuItem value={"Accessories"}>Accessories</MenuItem>
                  <MenuItem value={"Summer"}>Summer</MenuItem>
                  <MenuItem value={"Camping"}>Camping</MenuItem>
                  <MenuItem value={"Beach"}>Beach</MenuItem>
                  <MenuItem value={"Winter"}>Winter</MenuItem>
                  <MenuItem value={"Vintage"}>Vintage</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="select-label">Tag</InputLabel>
                <Select
                  multiple
                  sx={{ gridColumn: "span 2" }}
                  labelId="select-label"
                  name="tag"
                  value={values.tag}
                  label="Tag"
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                >
                  <MenuItem value={"Clothes"}>Clothes</MenuItem>
                  <MenuItem value={"Summer"}>Summer</MenuItem>
                  <MenuItem value={"Vintage"}>Vintage</MenuItem>
                  <MenuItem value={"Accessories"}>Accessories</MenuItem>
                  <MenuItem value={"Camping"}>Camping</MenuItem>
                  <MenuItem value={"Beach"}>Beach</MenuItem>
                  <MenuItem value={"Winter"}>Winter</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sku"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sku}
                name="sku"
                error={!!touched.sku && !!errors.sku}
                helperText={touched.sku && errors.sku}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dismensions"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dismensions}
                name="dismensions"
                error={!!touched.dismensions && !!errors.dismensions}
                helperText={touched.dismensions && errors.dismensions}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Weight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
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
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sale (%)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sale}
                name="sale"
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                value={isAvalilable}
                label="Avalilable"
                onChange={handleChangeSelect}
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
                <ImageUploading
                  maxFileSize={MAX_SIZE_IMG}
                  acceptType={["jpg", "jpeg", "png"]}
                  value={images}
                  onChange={onChange}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                  }) => (
                    <div className="upload__image-wrapper">
                      <Button
                        onClick={onImageUpload}
                        variant="contained"
                        component="label"
                        sx={{ background: colors.lightGreen }}
                      >
                        Upload Brand Image
                      </Button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            src={image["data_url"]}
                            alt=""
                            width="100"
                            className="my-2"
                          />
                          <div className="image-item__btn-wrapper gap-2 d-flex">
                            <Button
                              onClick={() => onImageUpdate(index)}
                              color="secondary"
                              variant="outlined"
                            >
                              Change
                            </Button>
                            <Button
                              onClick={() => onImageRemove(index)}
                              color="secondary"
                              variant="outlined"
                            >
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
                  maxFileSize={MAX_SIZE_IMG_PREVIEW}
                  acceptType={["jpg", "jpeg", "png"]}
                  multiple
                  value={imagesPreview}
                  onChange={onChangeImgPreview}
                  maxNumber={8}
                  dataURLKey="data_preview_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                  }) => (
                    <div className="upload__image-wrapper">
                      <Button
                        onClick={onImageUpload}
                        variant="contained"
                        component="label"
                        sx={{
                          whiteSpace: "nowrap",
                          background: colors.lightGreen,
                        }}
                      >
                        Upload Preview Images
                      </Button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            src={image["data_preview_url"]}
                            alt=""
                            width="100"
                            className="my-2"
                          />
                          <div className="image-item__btn-wrapper gap-2 d-flex">
                            <Button
                              onClick={() => onImageUpdate(index)}
                              color="secondary"
                              variant="outlined"
                            >
                              Change
                            </Button>
                            <Button
                              onClick={() => onImageRemove(index)}
                              color="secondary"
                              variant="outlined"
                            >
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
              <Button
                disabled={isLoading}
                type="submit"
                color="secondary"
                variant="contained"
              >
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
  sku: yup.string().required("required"),
  dismensions: yup.string().required("required"),
  subTitle: yup.string().required("required"),
  cost: yup.number().required("required"),
  weight: yup.number().required("required"),
  description: yup.string().required("required"),
  category: yup.string().required("required"),
  tag: yup.array(),
  sale: yup.number(),
});
const initialValues = {
  title: "",
  sku: "",
  dismensions: "",
  subTitle: "",
  description: "",
  cost: "",
  weight: "",
  img: "",
  img__grid: "",
  avaliable: true,
  category: "",
  sale: "",
  tag: [],
};

export default FormEditProduct;
