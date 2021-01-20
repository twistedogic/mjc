import "react-toastify/dist/ReactToastify.css";
import { Router } from "@reach/router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./style";
import Home from "./components/Home";
import New from "./components/New";
import View from "./components/View";
import { storage } from "./util/store";

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <Router>
      <Home path="/" store={storage} />
      <New path="/new" store={storage} />
      <View path="/game/:gameId" store={storage} />
    </Router>
    <ToastContainer />
  </ThemeProvider>
);

export default App;
