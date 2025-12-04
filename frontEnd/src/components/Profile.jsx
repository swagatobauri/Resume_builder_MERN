import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateProfile({ [name]: value }));
  };

  const containerStyle = {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--cardBg)",
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Personal Details
            </Typography>
          }
        />
        <CardContent>
          {/* Personal Details Grid */}
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={currentProfile?.firstName}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={currentProfile?.lastName}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                fullWidth
                required
                value={currentProfile?.email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="mobile"
                label="Mobile No"
                fullWidth
                required
                value={currentProfile?.mobile}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Address */}
          <Grid container spacing={2} alignItems="center">
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="address"
                label="Address"
                multiline
                rows={1}
                fullWidth
                value={currentProfile?.address}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <HomeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Social Links */}
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="linkedIn"
                label="LinkedIn"
                fullWidth
                value={currentProfile?.linkedIn}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <LinkedInIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="github"
                label="GitHub"
                fullWidth
                value={currentProfile?.github}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <GitHubIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Coding Profiles */}
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codechef"
                label="Codechef"
                fullWidth
                value={currentProfile?.codechef}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="leetcode"
                label="Leetcode"
                fullWidth
                value={currentProfile?.leetcode}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codeforces"
                label="Codeforces"
                fullWidth
                value={currentProfile?.codeforces}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Education Section Link */}
      <div style={containerStyles}>
        <Link to={'/education'} style={linkStyle}>
          {/* <h4>Education Section</h4> */}
          {/* <ArrowForwardIcon style={iconStyle} /> */}
        </Link>
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: '5px',
  borderRadius: '4px',
  padding: '5px',
};

const containerStyles = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  marginTop: '20px',
  paddingRight: '40px',
};

const iconStyle = {
  verticalAlign: 'middle',
  marginLeft: '5px',
};

export default Profile;
