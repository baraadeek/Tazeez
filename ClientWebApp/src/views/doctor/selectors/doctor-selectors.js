import { doctorAdapter } from "../adapter/doctor-adapter";

export const doctorSelectors = doctorAdapter.getSelectors(
  (state) => state.doctor.doctorList
).selectAll;
