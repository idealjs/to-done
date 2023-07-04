import './globals.css'

import { PropsWithChildren } from "react";

import AuthContext from "./components/AuthContext";

const layout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
};

export default layout;
