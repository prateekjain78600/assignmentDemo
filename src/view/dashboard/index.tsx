import React, { useMemo, useState, useEffect } from "react";
import { type ProductRow } from "../uploadSheet";
import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import CustomTable from "../../components/customTable";
import { BackIcon, EyeIcon } from "../../components/icons";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  sheetData: ProductRow[];
}

export interface TableProps {
  page: number;
  rowsPerPage: number;
  searchQuery: string;
}

const Dashboard: React.FC<DashboardProps> = ({ sheetData }) => {
  const [pagination, setPagination] = useState<TableProps>({
    page: 0,
    rowsPerPage: 10,
    searchQuery: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, [pagination.searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({
      ...prev,
      searchQuery: event.target.value,
    }));
  };
  const filteredData = useMemo(() => {
    const search = pagination.searchQuery.toLowerCase();
    return sheetData.filter((item) => {
      const productName = item.Product_Name?.toString().toLowerCase() || "";
      const amazonFee = item.Amazon_Fee?.toString().toLowerCase() || "";
      const profitPercentage =
        item.Profit_Percentage?.toString().toLowerCase() || "";

      return (
        productName.includes(search) ||
        amazonFee.includes(search) ||
        profitPercentage.includes(search)
      );
    });
  }, [sheetData, pagination.searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = pagination.page * pagination.rowsPerPage;
    const endIndex = startIndex + pagination.rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pagination.page, pagination.rowsPerPage]);

  const formattedRows = useMemo(() => {
    return paginatedData.map((item, index) => ({
      id: pagination.page * pagination.rowsPerPage + index + 1,
      productName: item.Product_Name ?? "NA",
      sales: item.Sales ?? 0,
      profit: item.Profit ?? 0,
      te: item.TE ?? 0,
      credit: item.Credit ?? 0,
      amazonFee: item.Amazon_Fee ?? 0,
      profitPercentage: item.Profit_Percentage ?? 0,
      Action: (
        <Grid container justifyContent="center" key={index}>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => navigate(`/dashboard/${index}`)}
            >
              <EyeIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      ),
    }));
  }, [paginatedData, pagination.page, pagination.rowsPerPage, navigate]);

  const handleRowClick = (id: string | number) => {
    navigate(`/dashboard/${id}`);
  };
const handleBack=()=>{
navigate('/upload')
}
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid>
          <Button variant="contained" startIcon={<BackIcon/>} onClick={handleBack}>Back to Upload</Button>
        </Grid>
      </Grid>

      <Grid
        container
        className="custom-Grid-table"
        mt={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid>
          <Typography variant="h5">All Products</Typography>
        </Grid>
        <Grid>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search by product, fee, or profit %"
            value={pagination.searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container>
        <CustomTable
          columns={[
            "S.No",
            "Product Name",
            "Sales",
            "Profit",
            "TE",
            "Credit",
            "Amazon Fee",
            "Profit Percentage",
            "Action",
          ]}
          rows={formattedRows}
          pagination={pagination}
          setPagination={setPagination}
          ActionSkeletonLength={1}
          count={filteredData.length}
          loading={false}
          handleRowClick={handleRowClick}
        />
      </Grid>
    </>
  );
};

export default Dashboard;
