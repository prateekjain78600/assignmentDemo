import React, { useCallback, useMemo } from "react";
import noData from "../assets/image/nodata.png";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Box,
  Grid,
  TableSortLabel,
} from "@mui/material";
import TableSkeleton from "./tabelSkelenton";

interface Row {
  id: string | number; // ✅ Ensure every row has an ID
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface CustomTableProps {
  columns: string[];
  pagination: {
    page: number;
    rowsPerPage: number;
    searchQuery: string;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      rowsPerPage: number;
      searchQuery: string;
    }>
  >;
  rows: Row[];
  count?: number;
  loading?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  onRequestSort?: (property: string) => void;
  ActionSkeletonLength?: number;
  isPaginationEnabled?: boolean;
  handleRowClick:(id:string | number )=>void
}

const CustomTable: React.FC<CustomTableProps> = React.memo(
  ({
    rows,
    pagination,
    setPagination,
    columns,
    count = 0,
    loading = false,
    order = "asc",
    orderBy,
    ActionSkeletonLength = 0,
    onRequestSort,
    isPaginationEnabled = true,
    handleRowClick
  }) => {

    const handleChangePage = useCallback(
      (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPagination((prev) => ({
          ...prev,
          page: newPage,
        }));
      },
      [setPagination]
    );

    const handleChangeRowsPerPage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setPagination((prev) => ({
          ...prev,
          rowsPerPage: value,
          page: value === 10000 ? 0 : prev.page,
        }));
      },
      [setPagination]
    );

    const createSortHandler = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (property: string) => (_event: React.MouseEvent<unknown>) => {
        onRequestSort?.(property);
      },
      [onRequestSort]
    );

    const skeletonRowNumbers = useMemo(() => new Array(10).fill(0), []);
    const skeletonTableCells = useMemo(
      () => new Array(columns.length).fill("20%"),
      [columns.length]
    );
    const skeletonOptions = useMemo(
      () => new Array(ActionSkeletonLength).fill(0),
      [ActionSkeletonLength]
    );

    

    const renderedRows = useMemo(
      () =>
        rows?.map((row, i) => (
          <TableRow
            key={i}
            onClick={() => handleRowClick(row.id)}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer", // ✅ Show pointer on hover
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {Object.values(row)?.map((ele, ind) => (
              <TableCell
                key={ind}
                align={
                  ind === 0
                    ? "left"
                    : ind === Object.values(row).length - 1
                    ? "center"
                    : "center"
                }
                component="th"
                scope="row"
              >
                {!Array.isArray(ele) ? (
                  ele
                ) : (
                  <Box>
                    {ele.map((btn, idx) =>
                      React.cloneElement(btn, { key: idx })
                    )}
                  </Box>
                )}
              </TableCell>
            ))}
          </TableRow>
        )),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [rows]
    );

    return (
      <TableContainer component={Paper} sx={{ bgcolor: "white" }}>
        <Table aria-label="custom pagination table">
          <TableHead sx={{ p: 1 }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={
                    index === 0
                      ? "left"
                      : index === columns.length - 1
                      ? "center"
                      : "center"
                  }
                  sx={{ whiteSpace: "nowrap", padding: "13px 15px" }}
                >
                  {column === "Expiry Date" ? (
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? order : "asc"}
                      onClick={createSortHandler(column)}
                    >
                      <strong style={{ fontSize: "13px" }}>{column}</strong>
                    </TableSortLabel>
                  ) : (
                    <strong style={{ fontSize: "13px" }}>{column}</strong>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "white" }}>
            {loading ? (
              <TableSkeleton
                rowNumber={skeletonRowNumbers}
                tableCell={skeletonTableCells}
                showOption={skeletonOptions}
              />
            ) : (
              renderedRows
            )}
          </TableBody>
          <TableFooter>
            {!loading && rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 200,
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img src={noData} alt="nodata" />
                    </Grid>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {isPaginationEnabled && (
              <TableRow>
                <TablePagination
                  page={pagination.page}
                  count={count}
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "All", value: 10000 },
                  ]}
                  rowsPerPage={pagination.rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
);

CustomTable.displayName = "CustomTable";

export default CustomTable;
