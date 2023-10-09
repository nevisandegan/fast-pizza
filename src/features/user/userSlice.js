import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAddress } from '../../services/apiGeocoding'


// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }
function getPosition() {
  let position = {};
  let error = '';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      position.lat = pos.coords.latitude;
      position.lng = pos.coords.longitude
    },
    (error) => {
      error = error.message
    }
  )
  if (error) return error;
  return position;
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async function () {
  // const positionObj = getPosition();
  // const position = {
  //   latitude: positionObj.coords.latitude,
  //   longitude: positionObj.coords.longitude,
  // };
  const position = getPosition();

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
})

const initialState = {
  username: '',
  status: "idle",
  position: {},
  address: "",
  error: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = "idle"
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error"
        state.error = "برای دریافت لوکیشن شما مشکلی پیش آمده است"
      })

})

export const { updateName } = userSlice.actions
export default userSlice.reducer;