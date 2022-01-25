import {
  addDoctorThunk,
  getDoctorListThunk,
  deleteDoctorThunk,
  getUsersThunk,
} from "../api/doctor-thunk-api";
import { doctorAdapter } from "../adapter/doctor-adapter";

export const doctorExtraReducers = (builder) => {
  builder.addCase(addDoctorThunk.fulfilled, (state, { payload }) => {
    doctorAdapter.addOne(state.doctorList, payload.data);
  });

  builder.addCase(getDoctorListThunk.fulfilled, (state, { payload }) => {
    doctorAdapter.addMany(state.doctorList, payload.data.data);
  });
  builder.addCase(deleteDoctorThunk.fulfilled, (state, { payload }) => {
    doctorAdapter.removeOne(state.doctorList, payload.id);
  });
  builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
    state.users = payload.data.data;
  });
};
