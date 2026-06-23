import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterConfig from "./route/RouterConfig";
import Loading from "./components/Elements/Loading";
import { ReadToken } from "./redux/slices/authSlice";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "leaflet/dist/leaflet.css";

function App() {
  const dispatch = useDispatch();
  const authChecked = useSelector((store) => store.auth.authChecked);

  // Sayfa her yüklendiğinde (ilk açılış / refresh) Redux belleği sıfırlanır.
  // Oturum cookie'sinden token'ı yeniden okumak için CheckMe'yi tetikle.
  useEffect(() => {
    dispatch(ReadToken());
  }, [dispatch]);

  // Oturum kontrolü bitene kadar route'ları render etme; aksi halde
  // PrivateRoute boş token'la çalışıp kullanıcıyı yetkisiz-erisim'e atar.
  if (!authChecked) {
    return <Loading status={true} />;
  }

  return (
    <div>
      <RouterConfig />
    </div>
  );
}

export default App;
