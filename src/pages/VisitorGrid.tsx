import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { endpoint } from "../api/enpoints";
import getData from "../api/getData";
import { IDModel, IVisitorswithId } from "../models";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import edit icon
import deleteData from "../api/deleteData";

const VisitorGrid = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  var navigate = useNavigate();

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const requestData: IDModel = { Id: "asdfds" };
        const levelDataResponse = await getData<IVisitorswithId[]>(
          endpoint.Visitors,
          requestData
        );

        setRows(
          levelDataResponse.data.map((visitor) => ({
            id: visitor.visitorId,
            ...visitor,
          }))
        );
      } catch (error) {
        navigate("/login");
        console.error("Error fetching levels:", error);
      }
    };

    fetchVisitor();
  }, []); 

  const handleDelete = async (id: string) => {
    console.log("Deleting row with id:", id);
    try {
      const deleteDataResponse = await deleteData(endpoint.Visitors, id);
      alert(deleteDataResponse.message);
      window.location.reload();
    } catch (error) {
      alert(error);
      console.error("Error deleting row:", error);
    }
  };

  const handleEdit = (id: string) => {
    // Redirect to edit form page with id
    console.log("Editing row with id:", id);
  
    navigate(`/editRegistration/${id}`); // Combine id with URL using template literals
  };
  
  const columns: GridColDef[] = [
    // Define columns as before
    // Add custom column for delete icon
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <DeleteIcon onClick={() => handleDelete(params.id?.toString() || "")} />
      ),
    },
    // Add custom column for edit icon
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <EditIcon onClick={() => handleEdit(params.id?.toString() || "")} />
      ),
    },
    // {
    //   field: "visitorId",
    //   headerName: "Visitor ID",
    //   width: 100,
    //   editable: true,
    //   headerClassName: "header-styles",
    // },
    {
      field: "firstName",
      headerName: "First Name",
      width: 100,
      headerClassName: "header-styles",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 100,
      headerClassName: "header-styles",
    },
    { 
      field: "nricNumber",
       headerName: "NRIC Number", 
       width: 100
     },
      { field: "plateNumber", headerName: "Plate Number", width: 100 },
      { field: "companyName", headerName: "Company Name", width: 100 },
      { field: "designation", headerName: "Designation", width: 100 },
      { field: "buildingName", headerName: "Building Name", width: 100 },
      { field: "levelName", headerName: "Level Name", width: 100 },
      { field: "roomName", headerName: "Room Name", width: 100 },
      { field: "isStayHomeNotice", headerName: "Is Stay Home Notice", width: 100 },
      { field: "isConfirmed14Day", headerName: "Is Confirmed 14 Day", width: 100 },
      { field: "isFever", headerName: "Is Fever", width: 100 },
      { field: "isAcknowledged", headerName: "Is Acknowledged", width: 100 }
  ];

  const handleDoubleClick = (id: string) => {
    // Redirect to edit form page with id
    console.log("Double-clicked row with id:", id);
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        onRowDoubleClick={(params) =>
          handleDoubleClick(params.id?.toString() || "")
        }
        checkboxSelection={true}
        sx={{
          boxShadow: 1,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
};

export default VisitorGrid;




// import  { useEffect, useState } from "react";
// import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
// import { endpoint } from "../api/enpoints";
// import getData from "../api/getData";
// import {  IDModel, IVisitorswithId } from "../models";
// import { useNavigate } from "react-router-dom";

// const VisitorGrid = () => {
//   const [rows, setRows] = useState<GridRowsProp>([]);
//   var navigate=useNavigate();
//   useEffect(() => {
//     const fetchVisitor = async () => {
//       try {
//         const requestData : IDModel  = { Id : 'asdfds' };
//         const levelDataResponse = await getData<IVisitorswithId[]>(endpoint.Visitors,requestData);
//         console.log(levelDataResponse);
//         // Assuming levelDataResponse is an array of objects with emp_id, emp_name, emp_profile, and emp_salary properties
//         setRows(levelDataResponse.data.map((visitor) => ({ id: visitor.visitorId, ...visitor })));
//       } catch (error) {
//         navigate('/login');
//         console.error('Error fetching levels:', error);
//       }
//     };

//     fetchVisitor();
//   }, []); // Empty dependency array to run the effect only once on mount

 // const columns: GridColDef[] = [
  //   {
  //     field: "visitorId",
  //     headerName: "Visitor ID",
  //     width: 100,
  //     editable: true,
  //     headerClassName: "header-styles",
  //   },
  //   {
  //     field: "firstName",
  //     headerName: "First Name",
  //     width: 100,
  //     headerClassName: "header-styles",
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last Name",
  //     width: 100,
  //     headerClassName: "header-styles",
  //   },
  //   { 
  //     field: "nricNumber",
  //      headerName: "NRIC Number", 
  //      width: 100
  //    },
  //     { field: "plateNumber", headerName: "Plate Number", width: 100 },
  //     { field: "companyName", headerName: "Company Name", width: 100 },
  //     { field: "designation", headerName: "Designation", width: 100 },
  //     { field: "buildingName", headerName: "Building Name", width: 100 },
  //     { field: "levelName", headerName: "Level Name", width: 100 },
  //     { field: "roomName", headerName: "Room Name", width: 100 },
  //     { field: "isStayHomeNotice", headerName: "Is Stay Home Notice", width: 100 },
  //     { field: "isConfirmed14Day", headerName: "Is Confirmed 14 Day", width: 100 },
  //     { field: "isFever", headerName: "Is Fever", width: 100 },
  //     { field: "isAcknowledged", headerName: "Is Acknowledged", width: 100 }
  // ];

//   return (
//     <div style={{ width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         autoHeight
//         initialState={{
//           sorting: {
//             sortModel: [{ field: "emp_salary", sort: "asc" }],
//           },
//         }}
//         checkboxSelection={true}
//         sx={{
//           boxShadow: 1,
//           "& .MuiDataGrid-cell:hover": {
//             color: "primary.main",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default VisitorGrid;
