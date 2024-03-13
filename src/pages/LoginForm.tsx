
import {
  Box,
  Button,
  TextField,
  Grid,

} from "@mui/material";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPostLogin } from "../models";
import { endpoint } from "../api/enpoints";
import fetchData from "../api/fetchData";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const navigate = useNavigate(); 

  const onSubmit = async (data: IPostLogin) => {
    try {
      const responseData = await fetchData(endpoint.login, data);

      localStorage.setItem("TokenKey", responseData.data.message);

      navigate("/list");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const schema = yup.object({
    UserName: yup.string().required("UserName is required"),
    Password: yup.string().required("Password is required"),
  })
  .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    } = useForm(
        {
        resolver: yupResolver(schema) as any,
        defaultValues: {
        UserName: "",
        Password: "",
        }
    });

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        width={{
          xs: "100%",
          md: "70%",
          lg: "50%",
        }}
        p={2}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="UserName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="Username"
                    {...field}
                    helperText={errors.UserName?.message}
                    error={!!errors.UserName}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    variant="standard"
                    fullWidth
                    label="Password"
                    {...field}
                    helperText={errors.Password?.message}
                    error={!!errors.Password}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "auto",
                    height: "auto",
                    padding: "8px 80px",
                    borderRadius: "24px",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
