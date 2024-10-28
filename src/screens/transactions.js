import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Transactions() {
  const [transactions] = useState([
    {
      id: 1,
      date: "2023-09-26",
      type: "Send",
      amount: "10 SOL",
      to: "8cVf...CyQF",
      status: "Completed",
    },
    {
      id: 2,
      date: "2023-09-25",
      type: "Receive",
      amount: "100 USDC",
      from: "3xTy...ZwP9",
      status: "Completed",
    },
    {
      id: 3,
      date: "2023-09-24",
      type: "Trade",
      amount: "5 SOL -> 500 USDC",
      status: "Completed",
    },
  ]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Transaction History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>From/To</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.to || tx.from || "-"}</TableCell>
                <TableCell>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Transactions;
