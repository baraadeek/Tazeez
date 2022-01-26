import { createEntityAdapter } from "@reduxjs/toolkit";

export const loginAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});
