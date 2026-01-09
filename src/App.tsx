import {useRoutes} from "react-router-dom";
import Provider from "@pages/Provider/Provider";
import ProviderConfiguration from "@pages/ProviderConfiguration/ProviderConfiguration";
import {AppRoutes} from "@enums/appRoutes";


function App() {
    const routes = useRoutes([
        {
            path: AppRoutes.HOME,
            element: <Provider/>
        },
        {
            path: AppRoutes.PROVIDER_CONFIGURATION,
            element: <ProviderConfiguration/>
        }
    ])

    return (
        <div>
            {routes}
        </div>
    )
}

export default App
