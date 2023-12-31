import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#dfe8f5',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CusomizedTable = (props) => {
  const [vh, setVh] = React.useState(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
  const [numRowsPerPage, setNumRowsPerPage] = React.useState(Math.floor((vh-100-56)/73 -1))
  
  const [pg, setpg] = React.useState(0); 

  function handleChangePage(e, newpage) { 
      setpg(newpage); 
  }

  return (
    <>
    <TableContainer>
      <Table sx={{ maxWdith: 1000}} aria-label="customized table" options={{rowStyle: {height: 30}}}>
        <TableHead>
          <TableRow>
            {props.columnName.map((name) => (<StyledTableCell><b>{name}</b></StyledTableCell>))}
            <StyledTableCell sx={{width: 80}}align='center'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.slice(pg * numRowsPerPage, pg * numRowsPerPage + numRowsPerPage).map((row) => (
            <StyledTableRow key={row.id}>
              {Object.values(row).slice(1).map((cell, index) => <StyledTableCell key={index} component="th" scope="row">{cell}</StyledTableCell>)}
              <StyledTableCell>
              <IconButton aria-label="edit" onClick={() => props.handleEditButton(row.id)}><ModeEditIcon /></IconButton>
              <IconButton aria-label="delete" onClick={() => props.handleDeleteButton(row.id, row.name)}><DeleteIcon /></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
      rowsPerPageOptions={[numRowsPerPage]} 
      component="div"
      count={props.rows.length} 
      rowsPerPage={numRowsPerPage} 
      page={pg} 
      onPageChange={handleChangePage} 
    /> 
    </>
  );
}

export default CusomizedTable;