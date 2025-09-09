import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@mui/material";
import {
  Search,
  NotificationsOutlined,
  SettingsOutlined,
  KeyboardArrowDown,
  CalendarToday,
  FilterList,
  FileDownload,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
  Visibility,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CustomTable from "../../../components/customTable";
import type { TableProps } from "../../dashboard";
import { useLocation } from "react-router-dom";

const ShopifyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const [pagination, setPagination] = useState<TableProps>({
    page: 0,
    rowsPerPage: 10,
    searchQuery: "",
  });
  const salesData = [
    { date: "Dec 1", sales: 1200, orders: 15, visitors: 245 },
    { date: "Dec 2", sales: 1850, orders: 22, visitors: 310 },
    { date: "Dec 3", sales: 920, orders: 12, visitors: 180 },
    { date: "Dec 4", sales: 2100, orders: 28, visitors: 420 },
    { date: "Dec 5", sales: 1650, orders: 19, visitors: 290 },
    { date: "Dec 6", sales: 2450, orders: 31, visitors: 380 },
    { date: "Dec 7", sales: 1980, orders: 25, visitors: 350 },
    { date: "Dec 8", sales: 2200, orders: 29, visitors: 410 },
    { date: "Dec 9", sales: 1750, orders: 21, visitors: 320 },
    { date: "Dec 10", sales: 2680, orders: 35, visitors: 480 },
    { date: "Dec 11", sales: 2100, orders: 27, visitors: 390 },
    { date: "Dec 12", sales: 1900, orders: 24, visitors: 340 },
    { date: "Dec 13", sales: 2350, orders: 30, visitors: 450 },
    { date: "Dec 14", sales: 2800, orders: 38, visitors: 520 },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 145,
      revenue: "$14,500",
      change: 12,
      image: "🎧",
    },
    {
      name: "Smartphone Case",
      sales: 98,
      revenue: "$2,940",
      change: -5,
      image: "📱",
    },
    {
      name: "Laptop Stand",
      sales: 87,
      revenue: "$6,090",
      change: 8,
      image: "💻",
    },
    {
      name: "Gaming Mouse",
      sales: 76,
      revenue: "$4,560",
      change: 15,
      image: "🖱️",
    },
    {
      name: "Desk Lamp",
      sales: 65,
      revenue: "$3,250",
      change: -2,
      image: "💡",
    },
  ];

  const trafficSources = [
    { name: "Direct", value: 35, color: "#00D4AA" },
    { name: "Google", value: 28, color: "#6366f1" },
    { name: "Social Media", value: 20, color: "#f59e0b" },
    { name: "Email", value: 10, color: "#ef4444" },
    { name: "Other", value: 7, color: "#8b5cf6" },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const recentOrders = [
    {
      id: "#1001",
      customer: "John Smith",
      product: "Wireless Headphones",
      amount: "$99.99",
      status: "fulfilled",
      time: "2 min ago",
      avatar: "JS",
    },
    {
      id: "#1002",
      customer: "Sarah Johnson",
      product: "Smartphone Case",
      amount: "$29.99",
      status: "pending",
      time: "5 min ago",
      avatar: "SJ",
    },
    {
      id: "#1003",
      customer: "Mike Chen",
      product: "Laptop Stand",
      amount: "$69.99",
      status: "fulfilled",
      time: "12 min ago",
      avatar: "MC",
    },
    {
      id: "#1004",
      customer: "Emily Davis",
      product: "Gaming Mouse",
      amount: "$59.99",
      status: "processing",
      time: "18 min ago",
      avatar: "ED",
    },
    {
      id: "#1005",
      customer: "Alex Wilson",
      product: "Desk Lamp",
      amount: "$49.99",
      status: "fulfilled",
      time: "25 min ago",
      avatar: "AW",
    },
  ];

  const kpiCards = [
    {
      title: "Total Sales",
      value: "$28,450",
      change: "+12.5%",
      changeType: "positive",
      icon: <AttachMoney />,
      color: "#00D4AA",
      bgColor: "#E8F8F5",
    },
    {
      title: "Orders",
      value: "342",
      change: "+8.2%",
      changeType: "positive",
      icon: <ShoppingCart />,
      color: "#6366f1",
      bgColor: "#EBEAFE",
    },
    {
      title: "Visitors",
      value: "4,847",
      change: "-2.4%",
      changeType: "negative",
      icon: <Visibility />,
      color: "#8b5cf6",
      bgColor: "#F3F0FF",
    },
    {
      title: "Conversion Rate",
      value: "7.1%",
      change: "+0.8%",
      changeType: "positive",
      icon: <TrendingUp />,
      color: "#f59e0b",
      bgColor: "#FEF3C7",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "fulfilled":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      default:
        return "default";
    }
  };
  const formattedRows = useMemo(() => {
    return recentOrders.map((order, index) => ({
      id: index + 1,
      order: (
        <Box>
          <Typography variant="body2" color="primary">
            {order.id}
          </Typography>
          <Typography variant="caption">{order.time}</Typography>
        </Box>
      ),
      sales: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              mr: 1,
              fontSize: "12px",
            }}
          >
            {order.avatar}
          </Avatar>
          <Box>
            <Typography variant="body2" textAlign={"left"}>
              {order.customer}
            </Typography>
            <Typography variant="caption">{order.product}</Typography>
          </Box>
        </Box>
      ),
      profit: (
        <Chip
          label={order.status}
          size="small"
          color={getStatusColor(order.status)}
          sx={{
            textTransform: "capitalize",
            fontSize: "11px",
          }}
        />
      ),
      amount: order.amount ?? "NA",
    }));
  }, [recentOrders]);
  const location = useLocation();
  const { email, accountName } = location.state || {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "white", boxShadow: "0 1px 0 rgba(0,0,0,0.1)" }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                S
              </Typography>
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#1A1A1A", fontWeight: 600 }}
              >
                {accountName ?? "My store"}
              </Typography>
              <Typography variant="caption" color="primary">
                {email ?? "NA"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#F3F4F6",
                borderRadius: 1,
                px: 2,
                py: 1,
                minWidth: 300,
              }}
            >
              <Search sx={{ mr: 1 }} />
              <InputBase
                placeholder="Search orders, products, customers..."
                sx={{ flex: 1, fontSize: "14px" }}
              />
            </Box>

            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>

            <IconButton>
              <SettingsOutlined />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }} />
              <KeyboardArrowDown sx={{ ml: 0.5 }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small">
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                sx={{ bgcolor: "white", minWidth: 150 }}
                startAdornment={<CalendarToday sx={{ mr: 1, fontSize: 18 }} />}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="Yesterday">Yesterday</MenuItem>
                <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                <MenuItem value="Last 90 days">Last 90 days</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
          </Box>

          <Button variant="contained" startIcon={<FileDownload />}>
            Export
          </Button>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {kpiCards.map((card, index) => (
            <Grid size={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                        {card.value}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {card.changeType === "positive" ? (
                          <TrendingUp
                            sx={{ color: "green", fontSize: 16, mr: 0.5 }}
                          />
                        ) : (
                          <TrendingDown
                            sx={{ color: "red", fontSize: 16, mr: 0.5 }}
                          />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              card.changeType === "positive" ? "green" : "red",
                            fontWeight: 600,
                            mr: 1,
                          }}
                        >
                          {card.change}
                        </Typography>
                        <Typography variant="body2" color="grey">
                          vs last month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: card.bgColor,
                        color: card.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={12}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Sales Overview
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Chip label="Sales" size="small" color="primary" />
                    <Chip label="Orders" size="small" variant="outlined" />
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#00D4AA"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00D4AA"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#00D4AA"
                      strokeWidth={3}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={6}>
            <Card
              sx={{
                borderRadius: 2,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1F2937", mb: 3 }}
                >
                  Traffic Sources
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {trafficSources.map((source, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            bgcolor: source.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#6B7280" }}>
                          {source.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {source.value}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ borderRadius: 2, height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1F2937" }}
                  >
                    Top Products
                  </Typography>
                  <Button size="small" sx={{ textTransform: "none" }}>
                    View all
                  </Button>
                </Box>
                <List sx={{ p: 0 }}>
                  {topProducts.map((product, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Typography variant="h6">{product.image}</Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: "#1F2937" }}
                          >
                            {product.name}
                          </Typography>
                        }
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#6B7280", mr: 1 }}
                            >
                              {product.sales} sold
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: product.change >= 0 ? "green" : "red",
                                fontWeight: 500,
                              }}
                            >
                              {product.change >= 0 ? "+" : ""}
                              {product.change}%
                            </Typography>
                          </Box>
                        }
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                        color="primary"
                      >
                        {product.revenue}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Recent Orders
                  </Typography>
                  <Button size="small" sx={{ textTransform: "none" }}>
                    View all
                  </Button>
                </Box>

                <CustomTable
                  columns={["Sno.","Order", "Customer", "Status", "Total"]}
                  rows={formattedRows}
                  pagination={pagination}
                  setPagination={setPagination}
                  ActionSkeletonLength={0}
                  count={recentOrders.length}
                  loading={false}
                  handleRowClick={() => {}}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopifyDashboard;
