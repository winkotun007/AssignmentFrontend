import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

// const isAuth =

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={1}
        borderColor={"#F4F4F4"}
        px={{
          xs: 2,
          md: 5,
          lg: 8,
        }}
        py={2}
        sx={{
          boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Visitor Form
        </Typography>
      </Box>
      <Outlet />
    </React.Fragment>
  );
};

export default Header;
