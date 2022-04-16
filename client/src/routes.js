import {NEWGAME_ROUTE, MAINPAGE_ROUTE, BESTRESULTS_ROUTE, LOGIN_ROUTE, REG_ROUTE} from './utils/consts';
import Game from "./pages/Game";
import Main from "./pages/Main";
import BestResults from "./pages/BestResults";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: NEWGAME_ROUTE,
        component: <Game/>,
    }
];
export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        component: <Main/>,
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth/>,
    },
    {
        path: REG_ROUTE,
        component: <Auth/>,
    },
    {
        path: BESTRESULTS_ROUTE,
        component: <BestResults/>,
    }
];