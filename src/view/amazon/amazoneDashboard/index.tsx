import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BackIcon,
  SalesIcon,
  ProfitIcon,
  FeeIcon,
  OrdersIcon,
} from "../../../components/icons";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const salesData = [
  { name: "Electronics", value: 4500 },
  { name: "Fashion", value: 3200 },
  { name: "Books", value: 1800 },
  { name: "Others", value: 1200 },
];

const profitTrend = [
  { month: "Jan", profit: 400 },
  { month: "Feb", profit: 700 },
  { month: "Mar", profit: 650 },
  { month: "Apr", profit: 900 },
  { month: "May", profit: 1200 },
];

const revenueData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 4000 },
  { month: "Apr", revenue: 5200 },
  { month: "May", revenue: 6500 },
];

const kpiData = [
  {
    title: "Total Sales",
    value: "$12,500",
    color: "#1976d2",
    icon: <SalesIcon />,
  },
  {
    title: "Total Profit",
    value: "$4,200",
    color: "#2e7d32",
    icon: <ProfitIcon />,
  },
  {
    title: "Amazon Fees",
    value: "$1,050",
    color: "#ed6c02",
    icon: <FeeIcon />,
  },
  {
    title: "Orders Completed",
    value: "328",
    color: "#9c27b0",
    icon: <OrdersIcon />,
  },
];

const recentOrders = [
  { id: "AMZ-001", product: "iPhone 15", amount: "$1200", status: "Shipped" },
  { id: "AMZ-002", product: "Nike Shoes", amount: "$150", status: "Delivered" },
  { id: "AMZ-003", product: "Samsung TV", amount: "$800", status: "Pending" },
  {
    id: "AMZ-004",
    product: "Books Bundle",
    amount: "$75",
    status: "Delivered",
  },
];

const AmazonDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, accountName } = location.state || {};

  return (
    <>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid size={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid>
              <Typography variant="h4" gutterBottom>
                Welcome, {accountName || "Amazon User"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Connected Email: {email || "N/A"}
              </Typography>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                onClick={() => navigate("/amazon")}
                startIcon={<BackIcon />}
              >
                Back to Amazon
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {kpiData.map((item, index) => (
          <Grid size={3} key={index}>
            <Card
              sx={{
                backgroundColor: item.color,
                color: "#fff",
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#fff", color: item.color }}>
                    {item.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={110}
                    dataKey="value"
                  >
                    {salesData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profit Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#1976d2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2e7d32" radius={[6, 6, 0, 0]} barSize={30}/>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            order.status === "Delivered"
                              ? "#2e7d32"
                              : order.status === "Pending"
                              ? "#ed6c02"
                              : "#1976d2",
                          fontWeight: "bold",
                        }}
                      >
                        {order.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AmazonDashboard;
