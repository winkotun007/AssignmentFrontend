import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  Add,
  ChevronRight,
  DeleteOutline,
  Edit,
  ExpandMore,
} from "@mui/icons-material";
import {  TreeNode } from "../models";

// interface TreeNode {
//   categoryId: string;
//   categoryCode: string;
//   categoryName: string;
//   parentCategoryId: string;
//   children?: TreeNode[];
// }

interface TreeViewProps {
  data: TreeNode[];
  mutateDelete: any;
  setDialogOpen: any;
}

const BasicTreeView: React.FC<TreeViewProps> = ({
  data,
  mutateDelete,
  setDialogOpen,
}) => {

  const [expanded, setExpanded] = useState<string[]>([]);

  // initial expanded all
  useEffect(() => {
    // Get all node IDs from the data and set them as expanded
    const allNodeIds = data.flatMap((node) => [
      node?.categoryId,
      ...(node.children?.map((child) => child?.categoryId) || []),
    ]);
    setExpanded(allNodeIds);
  }, [data]);

  const renderTree = (nodes: TreeNode[]) =>
    nodes.map((node, i) => (
      <Box display={"flex"} alignItems={"center"} width={"100%"} key={i}>
        <TreeItem
          key={node?.categoryId}
          nodeId={node?.categoryId}
          sx={{
            width: "100%",
            "& .MuiTreeItem-content": {
              p: 1,
            },
          }}
          label={
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box minWidth={300}>
                <Typography variant="body1">{node?.categoryCode}</Typography>
              </Box>
              <Box minWidth={300}>
                <Typography
                  title={node?.categoryName}
                  variant="body1"
                  sx={{
                    width: "300px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {node?.categoryName}
                </Typography>
              </Box>
              <Box minWidth={300}>
                {/* </Link> */}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    aria-label="add item"
                    // onClick={() => navigate(`/Department/edit/${node?.departmentId}`)}
                    onClick={() =>
                      setDialogOpen({
                        open: true,
                        id: node?.categoryId,
                        dialogType: "create",
                      })
                    }
                    size="small"
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="edit item"
                    // onClick={() => navigate(`/Department/edit/${node?.departmentId}`)}
                    onClick={() =>
                      setDialogOpen({
                        open: true,
                        id: node?.categoryId,
                        dialogType: "edit",
                      })
                    }
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete item"
                    onClick={() => mutateDelete.mutate(node?.categoryId)}
                    size="small"
                  >
                    <DeleteOutline />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          }
        >
          {Array.isArray(node?.children) ? renderTree(node?.children) : null}
        </TreeItem>
      </Box>
    ));

  return (
    <Box p={2}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Box minWidth={300}>
          <Typography variant="subtitle2"> {'Code'}</Typography>
        </Box>
        <Box minWidth={300}>
          <Typography variant="subtitle2">{'Name'}</Typography>
        </Box>
        <Box minWidth={300}>
          <Typography variant="subtitle2">{'Actions'}</Typography>
        </Box>
      </Box>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expanded}
        onNodeToggle={(_event, nodeIds) => setExpanded(nodeIds)}
        sx={{
          width: "100%",
        }}
      >
        {renderTree(data)}
      </TreeView>
    </Box>
  );
};

export default BasicTreeView;
