// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";

export const doctorAdapter = createEntityAdapter({
  selectId: (doctor) => doctor.id,
});
