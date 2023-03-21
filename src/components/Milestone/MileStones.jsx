import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MileStones = () => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Id</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {new Array(5).fill("test-stone").map((data, idx) => (
              <TableRow
                key={data + idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {"0837838"}
                </TableCell>
                <TableCell align="right">{100 + idx * 2}</TableCell>
                <TableCell align="right">{"10/11/22"}</TableCell>
                <TableCell align="right">{"Active"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MileStones;
