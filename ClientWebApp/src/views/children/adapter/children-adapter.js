// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";

export const childrenAdapter = createEntityAdapter({
  selectId: (children) => children.id,
});
