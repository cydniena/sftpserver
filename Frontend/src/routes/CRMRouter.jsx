import React from "react";
import { Route, Routes } from "react-router";
import * as ROUTES from "./RoutesConfig";

import Transactions from "../screens/TransactionsSftp";

const CRMRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.SFTP_TRANSACTION} element={<Transactions />} />
    </Routes>
  );
};



export default CRMRouter;
