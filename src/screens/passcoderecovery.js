import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { darkTheme } from "../theme/darkTheme";
import { PasscodeForm } from "../components/passcodeForm";
import { AnimatedButton } from "../components/animatedButton";
import { usePasscodeSetup } from "../hooks/usePasscodeSetup";

function PasscodeRecovery() {
  const {
    newPassword,
    setNewPassword,
    repeatPassword,
    setRepeatPassword,
    handleBack,
    handleContinue,
  } = usePasscodeSetup();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Typography
          variant="h5"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Set a passcode for your wallet
        </Typography>

        <PasscodeForm
          newPassword={newPassword}
          repeatPassword={repeatPassword}
          setNewPassword={setNewPassword}
          setRepeatPassword={setRepeatPassword}
        />

        <Box display="flex" justifyContent="space-between">
          <AnimatedButton variant="text" color="primary" onClick={handleBack}>
            BACK
          </AnimatedButton>
          <AnimatedButton
            variant="contained"
            color="primary"
            onClick={handleContinue}
          >
            CONTINUE
          </AnimatedButton>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "24px" }}
        >
          Need a new wallet?{" "}
          <Link href="/newwallet" color="primary">
            Create it here
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default PasscodeRecovery;
