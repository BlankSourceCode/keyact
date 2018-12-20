import * as React from "react";
import KeyduxApp from "./ux/keyduxApp"
import { hot } from 'react-hot-loader';

declare var module: any;
export const App = hot(module)(() => (
    <KeyduxApp />
));