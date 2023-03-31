import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { Data, Category } from "../model/model";

interface IncomingData {
  data: Data[];
  setPageData: any;
  // newlist: any;
}
export default function Pagination({ data, setPageData }: IncomingData) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    slicedData(page, rowsPerPage);
  }, [data]);

  const slicedData = (page, rowsPerPage) => {
    let newPageData = data.slice(
      (page + 1) * rowsPerPage - rowsPerPage,
      (page + 1) * rowsPerPage
    );

    setPageData(newPageData);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    slicedData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    slicedData(0, parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
