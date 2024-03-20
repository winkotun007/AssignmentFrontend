import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { endpoint } from "../../api/enpoints";
import getData from "../../api/getData";
import BasicTreeView from "../../components/BasicTreeView";
import {  ICategory, IDModel, TreeNode } from "../../models";
import CategoryForm from "./categoryForm";
import fetchData from "../../api/fetchData";
import updateData from "../../api/updateData";

interface IDialog {
  open: boolean;
  id: string;
  dialogType: "edit" | "create" | "createnew" | "";
}

const CategoryList = () => {
    
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDataList, setCategoryDataList] = useState<TreeNode[]>();

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const categoryDataListResponse = await getData<TreeNode[]>(endpoint.getTreeViewCategory, null);
        setCategoryDataList(categoryDataListResponse.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    };
    fetchVisitor();
  }, []);

  const lists = categoryDataList || [];

 // const [isFlattenLoading, setFlattenIsLoading] = useState(true);
  const [categoryFlattenDataList, setFlattenCategoryDataList] = useState<ICategory[]>();
 // const [flattenError, setFlattenError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFlatten = async () => {
      try {
        const categoryDataListResponse = await getData<ICategory[]>(endpoint.getFlattenCategory, null);
        setFlattenCategoryDataList(categoryDataListResponse.data);
      //  setFlattenIsLoading(false);
      } catch (error) {
     //   setFlattenError(error as Error);
     //   setFlattenIsLoading(false);
      }
    };
    fetchFlatten();
  }, []);

  const flattenCategoryLists = categoryFlattenDataList || [];

  const [isDialogOpen, setDialogOpen] = useState<IDialog>({
    open: false,
    id: "",
    dialogType: "",
  });

  const handleClickOpen = (
    id: string,
    dialogType: "edit" | "create" | "createnew"
  ) => {
    setDialogOpen({ open: true, id, dialogType });
  };
  const handleClickClose = () => {
    setDialogOpen({ open: false, id: "", dialogType: "" });
  };

  // Delete Category list By ID
  const createCategory = async (data: ICategory) => {
    try {
      const response = await fetchData<ICategory>(endpoint.Category,data);
      
      alert(response.message);

      const updatedCategoryList = await getData<TreeNode[]>(endpoint.getTreeViewCategory, null);
      setCategoryDataList(updatedCategoryList.data);
    } catch (error) {
      alert('Failed To Create');
    }
  };

  const updateCategory = async (data: ICategory) => {
    try {
      const response = await updateData(endpoint.Category,data);

      alert(response.message);

      const updatedCategoryList = await getData<TreeNode[]>(endpoint.getTreeViewCategory, null);
      setCategoryDataList(updatedCategoryList.data);
    } catch (error) {
      alert(error);
    }
  };
  /// End Delete Category list By ID

  /// Category Create

  ///Category Create END

  ///Category Update

  ///Category Update End

  ///Get By ID

  const [isCategoryLoading, setCategoryIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<ICategory>();
  //const [categoryError, setCategoryError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategoryByID = async () => {
      try {
        const reqData:IDModel= {Id : isDialogOpen.id};
        const categoryDataResponse = await getData<ICategory>(endpoint.getCategoryByID, reqData);
        setCategoryData(categoryDataResponse.data);
        setCategoryIsLoading(false);
      } catch (error) {
       // setCategoryError(error as Error);
        setCategoryIsLoading(false);
      }
    };
    fetchCategoryByID();
  }, [isDialogOpen.id]);

 
  //End Get By ID

  ///OnSubmit

  const onSubmit = (data: ICategory) => {
    if (isDialogOpen.dialogType === "edit") {

      updateCategory(data);
    } else {
      createCategory(data);
    }
  };

  return (
    <Box>
        <CardContent>
          <Grid container>
            <Grid item xs={12} justifyContent={"flex-end"} display={"flex"}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleClickOpen("", "createnew")}
              >
                {"CreateButton"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {isLoading ? (
          <LinearProgress />
        ) : (
          <BasicTreeView
            data={lists}
            mutateDelete={setDialogOpen}
            setDialogOpen={setDialogOpen}
          />
        )}
      {isCategoryLoading ? (
        <LinearProgress />
      ) : (
        <Dialog
          open={isDialogOpen.open}
          onClose={handleClickClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle> {"OrganizationUnit"}</DialogTitle>
          <DialogContent dividers>
            <CategoryForm
              onSubmit={onSubmit}
              mutateForm={
                isDialogOpen.dialogType === "edit" ? updateCategory : createCategory
              }
              CategoryLists={flattenCategoryLists}
              data={categoryData}
              dialogType={isDialogOpen.dialogType}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default CategoryList;
