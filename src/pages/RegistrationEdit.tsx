import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { IBuilding, IDModel, ILevel, IRoom, IVisitorsEdit } from "../models";
import fetchData from "../api/fetchData";
import { endpoint } from "../api/enpoints";
import { useEffect, useState } from "react";
import getData from "../api/getData";
import controller from "../api/apiGuru";
import {  useNavigate } from "react-router-dom";
interface Props {
  Id? : string;
  data? : IVisitorsEdit;
};


  const RegistrationEditForm = (props: Props)=> {
  
  const [levelList, setLevelList] = useState<ILevel[]>([]);
  const [buildingList,setBuildingList] = useState<IBuilding[]>([]);
  const [roomlist,setRoomList] = useState<IRoom[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const requestData : IDModel = {Id : 'dddd'};
        const buildingDataResponse = await getData<IBuilding[]>(endpoint.getBuidling,requestData);
        setBuildingList(buildingDataResponse.data);
      } catch (error) {
        console.error('Error fetching building data:', error);
      }
    };

    fetchAllData();
  }, []); 

  const fetchLevels = async (buildingId: string) => {
    try {
      const requestData : IDModel = { Id : buildingId };
      const levelDataResponse = await fetchData<ILevel[]>(endpoint.getLevelsByBuilding,requestData);
      setLevelList(levelDataResponse.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const fetchRooms = async (levelId: string) => {
    try {
      const requestData : IDModel = { Id : levelId };
      const roomDataResponse = await fetchData<IRoom[]>(endpoint.getRoomsByLevel,requestData);
      setRoomList(roomDataResponse.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Handle error if needed
    }
  };

    const onSubmit = async (data: IVisitorsEdit) => {
        try {
    
          const responseData = await controller('put',endpoint.Visitors, data);
            
          alert(responseData.message);

          navigate("/list");
    
        } catch (error) {
          console.log(error);
          console.error('Error:', error);
        }
      };
  

  const schema = yup
    .object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        businessEmail: yup.string().required("Business email is required"),
        nricNumber: yup.string().required("NRIC Number is required"),
        plateNumber: yup.string().required("Lisence Plate Number is required"),
        designation: yup.string().required("Designation is requrired"),
        buildingId: yup.string().required("Building is required."),
        levelId: yup.string().required("Level is required."),
        roomId: yup.string().required("Room is required."),
        isStayHomeNotice: yup
          .boolean()
          .required("You have to select one.")
          .test("is-true", "You have to select one.", (value) => value !== null),
        isConfirmed14Day: yup
          .boolean()
          .required("You have to select one.")
          .test("is-true", "You have to select one.", (value) => value !== null),
        isFever: yup
          .boolean()
          .required("You have to select one.")
          .test("is-true", "You have to select one.", (value) => value !== null),
        isAcknowledged:yup
          .boolean()
          .required("You have to select one.")
          .test("is-true", "You have to select one.", (value) => value !== null),
    })
    .required();

    console.log(props.data);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVisitorsEdit>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      visitorId: props?.data?.visitorId || "",
      firstName: props?.data?.firstName || "",
      lastName: props?.data?.lastName || "",
      businessEmail: props?.data?.businessEmail || "",
      nricNumber: props?.data?.nricNumber || "",
      plateNumber: props?.data?.plateNumber || "",
      designation: props?.data?.designation || "",
      buildingId: props?.data?.buildingId  || "",
      levelId: props?.data?.levelId  || "",
      roomId: props?.data?.roomId  || "",
      isStayHomeNotice: props?.data?.isStayHomeNotice || false,
      isConfirmed14Day: props?.data?.isConfirmed14Day || false,
      isFever: props?.data?.isFever || false,
      isAcknowledged: props?.data?.isAcknowledged || false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="First Name"
                    {...register("firstName")}
                    helperText={errors.firstName?.message}
                    error={!!errors.firstName} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="Last Name"
                    {...register("lastName")}
                    helperText={errors.lastName?.message}
                    error={!!errors.lastName} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="businessEmail"
                control={control}
                render={() => (
                  <TextField
                    type="email"
                    variant="standard"
                    fullWidth
                    label="Business Email"
                    {...register("businessEmail")}
                    helperText={errors.businessEmail?.message}
                    error={!!errors.businessEmail} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="nricNumber"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="NRIC/Fin Number"
                    {...register("nricNumber")}
                    helperText={errors.nricNumber?.message}
                    error={!!errors.nricNumber} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="plateNumber"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="Plate Number"
                    {...register("plateNumber")}
                    helperText={errors.plateNumber?.message}
                    error={!!errors.plateNumber} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="companyName"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="Company Name"
                    {...register("companyName")}
                    // helperText={errors.plateNo?.message}
                    // error={!!errors.plateNo} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="designation"
                control={control}
                render={() => (
                  <TextField
                    type="text"
                    variant="standard"
                    fullWidth
                    label="Designation"
                    {...register("designation")}
                    helperText={errors.designation?.message}
                    error={!!errors.designation} // bool - true or false
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
                name="buildingId"
                control={control}
                render={({ field }) => (
                  <FormControl
                    // variant="outlined"
                    fullWidth
                    error={!!errors.buildingId}
                  >
                    <Select
                      {...field}
                      label="buildingId"
                      id="buildingId"
                      labelId="buildingId"
                      onChange={(value) => {
                        field.onChange(value);
                        const buildingId = value.target.value;
                        console.log(buildingId);
                        //setSelectedBuilding(value.target.value);
                        console.log(value);
                        fetchLevels(buildingId);
                        //setValue("leaveTypeId", "");
                      }}
                    >
                      {buildingList?.map((item: any) => (
                        <MenuItem
                          key={item?.buildingId}
                          value={item?.buildingId}
                        >
                          {item?.buildingName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ ml: 0, mr: 0 }}>
                      {errors.buildingId?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
                name="levelId"
                control={control}
                render={({ field }) => (
                  <FormControl
                    // variant="outlined"
                    fullWidth
                    error={!!errors.levelId}
                  >
                    <Select
                      {...field}
                      label="levelId"
                      id="levelId"
                      labelId="levelId"
                      onChange={(value) => {
                        field.onChange(value);
                        const levelId = value.target.value;
                        //setSelectedLevel(value.target.value);
                        console.log(levelId);
                        fetchRooms(levelId);
                        console.log(value);
                        //setValue("leaveTypeId", "");
                      }}
                    >
                      {levelList?.map((item: any) => (
                        <MenuItem
                          key={item?.levelId}
                          value={item?.levelId}
                        >
                          {item?.levelName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ ml: 0, mr: 0 }}>
                      {errors.levelId?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <FormControl
                    // variant="outlined"
                    fullWidth
                    error={!!errors.levelId}
                  >
                    <Select
                      {...field}
                      label="roomId"
                      id="roomId"
                      labelId="roomId"
                      onChange={(value) => {
                        field.onChange(value);
                         console.log(value);
                        //setValue("leaveTypeId", "");
                      }}
                    >
                      {roomlist?.map((item: any) => (
                        <MenuItem
                          key={item?.roomId}
                          value={item?.roomId}
                        >
                          {item?.roomName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ ml: 0, mr: 0 }}>
                      {errors.roomId?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="isStayHomeNotice"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.isStayHomeNotice}>
                    <FormLabel id="isQuarantine">
                      Are you currently under a Quarantine Order, Stay-Home
                      Notice?
                    </FormLabel>
                    <RadioGroup row {...field} aria-label="isQuarantine">
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {errors.isStayHomeNotice?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="isConfirmed14Day"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.isConfirmed14Day}>
                    <FormLabel id="isContactClose">
                      Have you had close contact with a confirmed COVID-19 case
                      in the past 14 days?
                    </FormLabel>
                    <RadioGroup row {...field} aria-label="isContactClose">
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {errors.isConfirmed14Day?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="isFever"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.isFever}>
                    <FormLabel id="isHaveFlu">
                      Do you have any fever or flu-like symptoms?
                    </FormLabel>
                    <RadioGroup row {...field} aria-label="isHaveFlu">
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    <FormHelperText>{errors.isFever?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required />}
                labelPlacement="end"
                label="By completing this online form, I acknowledge and consent to the collection, use, and disclosure of my personal data for security verification, access control and safety perposes"
              />
            </Grid>
            <Grid item xs={12} mt={5}>
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
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
  );
};

export default RegistrationEditForm;
