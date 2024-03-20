import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid,  TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ICategory } from "~/models";

type Props = {
  onSubmit: (data: ICategory) => void;
  mutateForm: any;
  categoryId?: string;
  data?: ICategory;
  CategoryLists: any;
  dialogType: string;
};

const CategoryForm = (props: Props) => {

  const { onSubmit, mutateForm, data, dialogType } = props;
  const schema = yup
    .object({
      categoryCode: yup.string().required('Category Code is required.'),
      categoryName: yup.string().required('Category Name is required.'),
      parentCategoryId: yup.string(),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      categoryCode: dialogType === "edit" ? data?.categoryCode : "" || "",
      categoryName: dialogType === "edit" ? data?.categoryName : "" || "",
      parentCategoryId:
        dialogType === "edit"
          ? data?.parentCategoryId == null
            ? ""
            : data?.parentCategoryId
          : (data?.categoryId == null
            ? ""
            : data?.categoryId) || "",
    },
  });

  // const handleAutoCompleteChange = (
  //   _type: string,
  //   value: any | null,
  //   reason: AutocompleteChangeReason
  // ) => {
  //   if (reason === "selectOption" && value) {
  //     setValue("parentCategoryId", value.CategoryId, {
  //       shouldValidate: true,
  //     });
  //   } else {
  //     setValue("parentCategoryId", "", { shouldValidate: true });
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={4}>
          <Controller
            name="categoryCode"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label={"Code *"}
                {...field}
                {...register("categoryCode")}
                type="text"
                helperText={errors.categoryCode?.message}
                error={!!errors.categoryCode}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Controller
            name="categoryName"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label={"Name *"}
                {...field}
                {...register("categoryName")}
                type="text"
                helperText={errors.categoryName?.message}
                error={!!errors.categoryName}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={12}>
        {/* <Grid item xs={12} md={4}>
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
 */}

          {/* <Controller
            name="parentCategoryId"
            control={control}
            render={
              ({ field }) => (
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
              )
              
              
              () => (
              <CustomAutoComplete
                onChange={(_type, value, reason) =>
                  handleAutoCompleteChange("", value, reason)
                }
                idPropertyName={"CategoryId"}
                getOptionLabel={(option: {
                  CategoryId: string;
                  parentPathDescription: string;
                }) => option.parentPathDescription}
                options={CategoryLists}
                value={
                  CategoryLists.find(
                    (option: { CategoryId: string }) =>
                      option.CategoryId === getValues("parentCategoryId")
                  ) || null
                }
                error={!!errors.parentCategoryId}
                helperText={errors.parentCategoryId?.message}
                label={
                  t("ParentCategory")}
                disabled={dialogType === "create" ? true : false}
              />
            )}
          /> */}
        </Grid>
      </Grid>
      {
        dialogType &&
        <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={mutateForm.isPending}
          >
            {dialogType === "edit"
              ? "SaveButton"
              : "SubmitButton"}
          </LoadingButton>
        </Box>
      }
    </form>
  );
};

export default CategoryForm;
