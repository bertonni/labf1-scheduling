import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import StaticDatePickerLandscape from "./components/StaticDatePickerLandscape";
import ViewReservations from "./components/ViewReservations";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, logout, login } = useAuth();
  const [selectedTab, setSelectedTab] = useState(1);
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectedTab = (newValue) => {
    setSelectedTab(newValue);
  };

  if (!user || !user.email.includes("@igarassu.ifpe.edu.br")){
    logout();
    return (
      <Box display="flex" flexDirection={"column"} alignItems={"center"} px={4}>
        <Typography
          textAlign={"center"}
          mt={4}
          mb={2}
          variant={smallScreen ? "h5" : "h4"}
        >
          Agendamento de Laboratório
        </Typography>
        <Typography
          textAlign={"center"}
          mb={2}
          mt={4}
          variant={smallScreen ? "h7" : "h6"}
        >
          Você precisa fazer o login com o e-mail institucional para fazer um
          agendamento
        </Typography>
        <Button
          onClick={login}
          variant="contained"
          size={smallScreen ? "small" : "medium"}
        >
          Entrar
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      height={"100vh"}
      sx={{ px: { xs: "2rem", sm: "3rem", lg: "6rem" } }}
    >
      <Typography
        textAlign={"center"}
        mt={4}
        mb={2}
        variant={smallScreen ? "h5" : "h4"}
      >
        Agendamento de Laboratório
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleSelectedTab(1)}
            size={smallScreen ? "small" : "medium"}
            sx={{
              backgroundColor: selectedTab === 1 ? "#00897b" : "#80cbc4",
              "&:focus": { backgroundColor: "#00897b" },
              "&:hover": { backgroundColor: "#006759" },
            }}
          >
            Reservar Horário
          </Button>
          <Button
            onClick={() => handleSelectedTab(2)}
            size={smallScreen ? "small" : "medium"}
            sx={{
              backgroundColor: selectedTab === 2 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
            }}
          >
            Ver Reservas
          </Button>
        </ButtonGroup>
      </Box>
      {user && (
        <Button
          variant="contained"
          color="error"
          size={smallScreen ? "small" : "medium"}
          onClick={logout}
          sx={{ position: "absolute", top: 4, right: 20 }}
        >
          Sair
        </Button>
      )}
      {selectedTab === 1 ? <StaticDatePickerLandscape /> : <ViewReservations />}
    </Box>
  );
}

export default App;
