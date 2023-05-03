import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LeagueService from "./services/LeagueService";
import NavBar from "./components/NavBar";
import ScheduleList from "./components/ScheduleList";
const comando = new LeagueService();
function App() {
  const [data, setData] = useState([]);
  useEffect(async () => {
    const response = await comando.getMatches();
    setData(response);
  }, []);

  return (
    <div>
      <Route path="/" component={NavBar} />
      <Route
        path="/schedule"
        render={(props) => <ScheduleList {...props} arrayMatches={data} />}
      />
    </div>
  );
}

export default App;
