import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import * as PostsApi from "../../../api/PostsRequests";
import * as UserApi from "../../../api/UserRequests";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function PostsApproval() {
  const [data, setData] = useState([]);
  const allPosts = async () => {
    const { data } = await PostsApi.getAllPost();
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    allPosts();
  }, []);
  const handleApprove = async (id) => {
    const { data } = await UserApi.approvePost(id);
    console.log(data);
    window.location.reload();
    // setData(data);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">
                <a
                  href={`http://localhost:5000/images/${row.image}`}
                  target="_blank"
                >
                  {row.image}
                </a>
              </TableCell>
              {/* <TableCell align="right">{row.createdAt}</TableCell> */}
              <TableCell align="right">
                <Button onClick={() => handleApprove(row._id)}>Approve</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
