import * as React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "0.375rem",
  boxShadow: 24,
  p: 4,
};

const WarningModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="warning-modal-title"
      aria-describedby="warning-modal-description"
    >
      <Box sx={style}>
        <Typography id="warning-modal-title" variant="h6" component="h2">
          Hello and welcome!
        </Typography>

        <Typography sx={{ mt: 2 }} variant="body2">
          Our website is currently under development, and we're working hard to
          bring you the best possible experience. Please note that during this
          phase, not all functionalities may be working as intended.
        </Typography>

        <Typography sx={{ mt: 1 }} variant="body2">
          ⚠️ IMPORTANT: Do not attempt to transfer any funds through our website
          at this time, as we cannot guarantee the security and functionality of
          financial transactions.
        </Typography>

        <Typography sx={{ mt: 1 }} variant="body2">
          We appreciate your patience and understanding as we continue to
          improve our site. If you have any questions or need assistance, please
          feel free to contact us at{" "}
          <a href="mailto:contact@huntforlancer.com">
            contact@huntforlancer.com
          </a>
        </Typography>

        <Typography sx={{ mt: 1 }} variant="body2">
          Thank you for visiting, and stay tuned for exciting updates!
        </Typography>
      </Box>
    </Modal>
  );
};

export default WarningModal;
