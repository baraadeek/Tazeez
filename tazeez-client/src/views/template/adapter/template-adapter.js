// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";

export const templateAdapter = createEntityAdapter({
  selectId: (template) => template.id,
});
