import * as React from "react";
import { hot } from "react-hot-loader";
import KeyduxApp from "./ux/keyduxApp";

declare var module: any;
const app = hot(module)(() => (
    <KeyduxApp />
));

export { app as App };
