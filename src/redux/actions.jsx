// export const fetchAllUsers = () => async (dispatch, getState) => {
//   const { admin, isAdminLoggedIn } = getState();

//   if (!isAdminLoggedIn || admin?.email !== "admin@food.com") {
//     return;
//   }

//   dispatch({ type: "FETCH_USERS_REQUEST" });

//   try {
//     const data = [
//       { _id: "1", name: "sandeep", email: "sandeep@gmail.com" },
//       { _id: "2", name: "Anita", email: "anita@gmail.com" },
//       { _id: "3", name: "Kiran", email: "kiran@gmail.com" },
//     ];

//     dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
//   } catch (err) {
//     dispatch({
//       type: "FETCH_USERS_FAIL",
//       payload: err.message,
//     });
//   }
// };

export const fetchAllUsers = () => async (dispatch, getState) => {
  const { admin, isAdminLoggedIn } = getState();

  if (!isAdminLoggedIn || admin?.email !== "admin@food.com") {
    return;
  }

  const data = [
    { _id: "1", name: "Sandeep", email: "sandeep@gmail.com" },
    { _id: "2", name: "Anita", email: "anita@gmail.com" },
    { _id: "3", name: "Kiran", email: "kiran@gmail.com" },
  ];

  dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });

  dispatch({ type: "FETCH_USERS_REQUEST" });

  try {
    console.log("hello");
  } catch (err) {
    dispatch({
      type: "FETCH_USERS_FAIL",
      payload: err.message,
    });
  }
};
