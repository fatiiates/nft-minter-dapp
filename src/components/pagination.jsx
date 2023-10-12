import React from "react";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid"

const StyledPagination = ({
  count,
  page,
  onChange,
  rowsPerPage,
  onChangeRowsPerPage,
}) => {
  return (
    <React.Fragment>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Grid container padding={.5} display={{xs: "block", sm: "none"}} ></Grid>
      <FormControl sx={{ minWidth: 120, margin: "10px" }}>
        <InputLabel htmlFor="rows-per-page">Rows per page</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
          label="Rows per page"
          inputProps={{
            id: "rows-per-page",
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
  );
};

export default StyledPagination;
