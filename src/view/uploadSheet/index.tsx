import React, { useState, type ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { Button, Typography, Paper, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloudDownloadIcon, UploadIcon } from "../../components/icons";
import { useAuth } from "../../hooks/useAuth";

export interface ProductRow {
  id: number;
  Product_Name: string;
  Sales: number;
  Profit: number;
  TE: number;
  Credit: number;
  Amazon_Fee: number;
  Profit_Percentage: number;
}

interface UploadSheetProps {
  setSheetData: (data: ProductRow[]) => void;
}

const UploadSheet: React.FC<UploadSheetProps> = ({ setSheetData }) => {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {sheetData}=useAuth()

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: ProductRow[] = XLSX.utils.sheet_to_json(sheet, {
          defval: "",
        });

        const requiredColumns = [
          "id",
          "Product_Name",
          "Sales",
          "Profit",
          "TE",
          "Credit",
          "Amazon_Fee",
          "Profit_Percentage",
        ];

        const firstRow = jsonData[0];
        const hasAllColumns = requiredColumns.every((col) => col in firstRow);

        if (!hasAllColumns) {
          setError(
            "Invalid file format. Make sure the sheet contains all required columns."
          );
          return;
        }

        setSheetData(jsonData);

        localStorage.setItem("sheetData", JSON.stringify(jsonData));
        navigate("/dashboard");
      } catch (err) {
        console.error("Sheet Upload Error:", err);
        setError("Failed to read the file. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadSampleFile = () => {
    const sampleData: ProductRow[] = [
      {
        id: 1,
        Product_Name: "Product A",
        Sales: 1000,
        Profit: 200,
        TE: 50,
        Credit: 20,
        Amazon_Fee: 30,
        Profit_Percentage: 20,
      },
      {
        id: 2,
        Product_Name: "Product B",
        Sales: 500,
        Profit: 100,
        TE: 25,
        Credit: 10,
        Amazon_Fee: 15,
        Profit_Percentage: 20,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SampleSheet");

    XLSX.writeFile(workbook, "Sample_Product_Sheet.xlsx");
  };

  return (
    <Grid
      container
      sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Paper elevation={6} sx={{ p: 5, textAlign: "center", borderRadius: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Upload Product Sheet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          Upload a CSV or Excel sheet containing product data. Columns required:{" "}
          <br />
          <strong>
            Product Name, Sales, Profit, TE, Credit, Amazon Fee, Profit
            Percentage
          </strong>
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
          >
            Upload File
            <input
              type="file"
              accept=".csv,.xlsx"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={downloadSampleFile}
            startIcon={<CloudDownloadIcon />}
          >
            Download Sample File
          </Button>
        </Stack>
       {sheetData?.length !=0 && <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </Button>
        </Stack>}

        {fileName && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            Selected File: {fileName}
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default UploadSheet;
