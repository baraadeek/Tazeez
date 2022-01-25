// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";

export const userAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});
