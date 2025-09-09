import { Grid, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

interface profileProps {
  label: string;
  value: string;
}

const Profile = () => {
  const { user } = useAuth();

  console.log(user?.displayName, "user");
  const profileData: profileProps[] = [
    {
      label: "Full Name",
      value: user?.displayName ?? "NA",
    },
    {
      label: "Email",
      value: user?.email ?? "NA",
    },
    {
      label: "Phone Number",
      value: user?.phoneNumber ?? "NA",
    },

    {
      label: "Last login At",
      value: user?.metadata?.lastSignInTime ?? "NA",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4">Profile</Typography>
        </Grid>
        <Grid size={2}>
          <img
            src={user?.photoURL ?? ""}
            alt="profile"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              display: "block",
              borderRadius: "16px",
              border: "1px solid #ddd",
            }}
          />
        </Grid>
        <Grid size={10} className="custom-Grid-table">
          <Typography variant="h6">User Information</Typography>
          <Grid container spacing={2} mt={2}>
            {profileData.map((item) => (
              <Grid size={6}>
                <Typography variant="body1" fontWeight="bold">
                  {item?.label}
                </Typography>
                <Typography variant="body1">{item?.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
