import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import type { ProductRow } from "../../uploadSheet";
import { BackIcon } from "../../../components/icons";

interface CardDataProps {
  label: string;
  value: number | string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sheetData, loading } = useAuth();

  const product: ProductRow | undefined = sheetData?.find(
    (item: ProductRow) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Product not found!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  // parse numbers once and reuse
  const salesNum = Number(product.Sales) || 0;
  const profitNum = Number(product.Profit) || 0;
  const teNum = Number(product.TE) || 0;
  const creditNum = Number(product.Credit) || 0;
  const amazonFeeNum = Number(product.Amazon_Fee) || 0;

  const pieData = [
    { name: "Sales", value: salesNum },
    { name: "Profit", value: profitNum },
    {
      name: "Expenses",
      value: Math.max(0, salesNum - profitNum - creditNum - teNum),
    },
  ];

  const COLORS = ["#1976d2", "#4caf50", "#ff9800"];

  const barData = [
    { name: "Sales", value: salesNum },
    { name: "Profit", value: profitNum },
    { name: "TE", value: teNum },
    { name: "Credit", value: creditNum },
    { name: "Amazon Fee", value: amazonFeeNum },
  ];

  const cardData: CardDataProps[] = [
    { label: "Product Name", value: product?.Product_Name ?? "-" },
    { label: "Profit", value: product?.Profit ?? "-" },
    { label: "Product Percentage", value: product?.Profit_Percentage ?? "-" },
    { label: "Amazon Fee", value: product?.Amazon_Fee ?? "-" },
    { label: "Credit", value: product?.Credit ?? "-" },
    { label: "Sales", value: product?.Sales ?? "-" },
    { label: "TE", value: product?.TE ?? "-" },
  ];

  return (
    <>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h4">Product details</Typography>
        <Button
          onClick={() => navigate("/dashboard")}
          startIcon={<BackIcon />}
          variant="contained"
        >
          Back to dashboard
        </Button>
      </Grid>

      <Grid container spacing={2} className="custom-Grid-table" mt={2}>
        {cardData.map((item, index) => (
          <Grid size={4} key={index}>
            <Typography variant="body1" fontWeight="bold">
              {item?.label}
            </Typography>
            <Typography variant="body1" mt={1}>
              {loading ? <Skeleton width="60%" height={40} /> : item?.value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid size={6} className="custom-Grid-table">
          <Grid
            container
            mb={3}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontWeight={600}>
              Sales vs Profit vs Expenses
            </Typography>
          </Grid>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                // safe label: handle possible undefined percent
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={(entry: any) =>
                  `${entry?.name ?? ""} ${Math.round(((entry?.percent ?? 0) as number) * 100)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid size={6} className="custom-Grid-table">
          <Grid
            container
            mb={3}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontWeight={600}>
              Product Performance
            </Typography>
          </Grid>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
