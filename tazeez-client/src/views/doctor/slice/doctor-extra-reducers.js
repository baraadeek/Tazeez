import { addDoctorThunk, getDoctorListThunk } from "../api/doctor-thunk-api";
import { doctorAdapter } from "../adapter/doctor-adapter";

export const doctorExtraReducers = (builder) => {
  builder.addCase(addDoctorThunk.fulfilled, (state, { payload }) => {
    doctorAdapter.addOne(state.doctorList, payload.data);
  });

  builder.addCase(getDoctorListThunk.fulfilled, (state, { payload }) => {
    doctorAdapter.addMany(state.doctorList, payload.data.data);
  });
};
