import "./globals.css";

import { PropsWithChildren } from "react";

const layout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default layout;
