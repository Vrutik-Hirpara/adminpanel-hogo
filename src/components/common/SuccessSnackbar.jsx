import { Snackbar, Alert } from "@mui/material";

export default function SuccessSnackbar({ success, setSuccess }) {
  return (
    <Snackbar
      open={!!success}
      autoHideDuration={3000}
      onClose={() => setSuccess("")}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 9999 }}
    >
      <Alert severity="success" onClose={() => setSuccess("")}>
        {success}
      </Alert>
    </Snackbar>
  );
}