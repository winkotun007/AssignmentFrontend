import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

interface ShowMessageProps {
  open: boolean;
  message: string;
  duration?: number;
}

const ShowMessage: React.FC<ShowMessageProps> = ({
  open,
  message,
  duration = 3000
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);


  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      message={message}
    />
  );
};

export default ShowMessage;
