// import React, { useState, useEffect } from "react";
// import "./LoginPop.css";
// import { assets } from "../../assets/assets";
// import { useAuth } from "../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { getAreas } from "../../services/api";
// import { signupApi, loginApi } from "../../services/authapi";

// /* ================= VALIDATION ================= */

// const LoginSchema = Yup.object({
//   email: Yup.string().email("Invalid email").required("Email required"),
//   password: Yup.string().required("Password required"),
// });

// const SignupSchema = Yup.object({
//   name: Yup.string().required("Name required"),
//   // country: Yup.string().required("Country required"),
//   // mobile: Yup.string()
//   //   .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
//   //   .required("Mobile required"),
//   email: Yup.string().email("Invalid email").required("Email required"),
//   password: Yup.string().min(6, "Min 6 chars").required("Password required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm password required"),
//   otp: Yup.string().length(6, "OTP must be 6 digits"),
// });

// const ForgotPasswordSchema = Yup.object({
//   email: Yup.string().email("Invalid email").required("Email required"),
//   otp: Yup.string().length(6, "OTP must be 6 digits"),
//   newPassword: Yup.string().min(6, "Min 6 chars"),
//   confirmPassword: Yup.string().oneOf(
//     [Yup.ref("newPassword")],
//     "Passwords must match"
//   ),
// });

// /* ================= COMPONENT ================= */

// const LoginPop = () => {
//   const [currState, setCurrState] = useState("Login");
//   const [otpSent, setOtpSent] = useState(false);
//   const [areas, setAreas] = useState([]);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const isLogin = currState === "Login";
//   const isSignup = currState === "Sign Up";
//   const isForgot = currState === "Forgot";

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const fetchAreas = async () => {
//       try {
//         const res = await getAreas();
//         setAreas(res.data.meals);
//       } catch (err) {
//         console.error("Failed to fetch areas:", err);
//       }
//     };

//     fetchAreas();

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="login-pop auth-layout">
//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           // country: "",
//           // mobile: "",
//           password: "",
//           confirmPassword: "",
//           otp: "",
//           newPassword: "",
//         }}
//         validationSchema={
//           isLogin ? LoginSchema : isSignup ? SignupSchema : ForgotPasswordSchema
//         }
//         onSubmit={async (values, { setSubmitting, setErrors }) => {
//           try {
//             /* =============== SIGN UP =============== */
//             if (isSignup) {
//               // if (!otpSent) {
//               //   alert("OTP Sent to " + values.email);
//               //   setOtpSent(true);
//               //   return;
//               // }

//               await signupApi({
//                 name: values.name,
//                 email: values.email,
//                 password: values.password,
//                 confirmPassword: values.confirmPassword,
//               });

//               alert("Signup successful!");
//               setCurrState("Login");
//               setOtpSent(false);
//               return;
//             }

//             if (isLogin) {
//               const res = await loginApi({
//                 email: values.email,
//                 password: values.password,
//               });

//               localStorage.setItem("token", res.data.token);
//               login(res.data.user);

//               navigate("/foodlist");
//               return;
//             }

//             /* =============== FORGOT PASSWORD =============== */
//             if (isForgot) {
//               if (!otpSent) {
//                 alert("OTP Sent to " + values.email);
//                 setOtpSent(true);
//                 return;
//               }

//               alert("Password reset successful!");
//               setCurrState("Login");
//               setOtpSent(false);
//             }
//           } catch (err) {
//             setErrors({
//               email: err.response?.data?.message || "Something went wrong",
//             });
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ setFieldValue }) => (
//           <Form className="form-container animate-fade-ins">
//             {/* TITLE */}
//             <div className="login-title">
//               <h2>{currState}</h2>
//               {/* {!isForgot && (
//                 <img
//                   src={assets.cross_icon}
//                   alt="close"
//                   onClick={() => navigate("/")}
//                 />
//               )} */}
//             </div>

//             <div className="login-input">
//               {/* SIGN UP */}
//               {isSignup && (
//                 <>
//                   <Field name="name" placeholder="Your Name" />
//                   <ErrorMessage name="name" component="span" />

//                   {/* <Field name="country">
//                     {({ field }) => (
//                       <select
//                         {...field}
//                         onChange={(e) =>
//                           setFieldValue("country", e.target.value)
//                         }
//                       >
//                         <option value="">Select Country</option>
//                         {areas?.map((a) => (
//                           <option key={a.strArea} value={a.strArea}>
//                             {a.strArea}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </Field>
//                   <ErrorMessage name="country" component="span" />

//                   <Field name="mobile" placeholder="Mobile Number" />
//                   <ErrorMessage name="mobile" component="span" />*/}
//                 </>
//               )}

//               {/* COMMON */}
//               {(isLogin || isSignup || isForgot) && (
//                 <>
//                   <Field name="email" placeholder="Your Email" />
//                   <ErrorMessage name="email" component="span" />
//                 </>
//               )}

//               {(isLogin || isSignup) && (
//                 <>
//                   <Field
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage name="password" component="span" />
//                 </>
//               )}

//               {/* FORGOT PASSWORD */}
//               {isForgot && otpSent && (
//                 <>
//                   <Field name="otp" placeholder="Enter OTP" />
//                   <Field
//                     type="password"
//                     name="newPassword"
//                     placeholder="New Password"
//                   />
//                   <Field
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                   />
//                 </>
//               )}

//               {/* SIGN UP EXTRA */}
//               {isSignup && (
//                 <>
//                   <Field
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Re-enter Password"
//                   />
//                   <ErrorMessage name="confirmPassword" component="span" />

//                   {/* {otpSent && <Field name="otp" placeholder="Enter OTP" />} */}
//                 </>
//               )}

//               {/* FORGOT LINK */}
//               {isLogin && (
//                 <p
//                   className="forgot-link"
//                   onClick={() => {
//                     setCurrState("Forgot");
//                     setOtpSent(false);
//                   }}
//                 >
//                   Forgot Password?
//                 </p>
//               )}
//             </div>

//             <button type="submit" className="submit-btn">
//               {isLogin
//                 ? "Login"
//                 : isSignup
//                 ? "Signup"
//                 : otpSent
//                 ? "Reset Password"
//                 : "Send OTP"}
//             </button>

//             {/* FOOTER */}
//             {isLogin && (
//               <p className="footer-text">
//                 Create a new account?
//                 <span onClick={() => setCurrState("Sign Up")}> Click here</span>
//               </p>
//             )}

//             {isSignup && (
//               <p className="footer-text">
//                 Already have an account?
//                 <span onClick={() => setCurrState("Login")}> Login here</span>
//               </p>
//             )}

//             {isForgot && (
//               <p className="footer-text">
//                 Remember password?
//                 <span onClick={() => setCurrState("Login")}> Login</span>
//               </p>
//             )}
//           </Form>
//         )}
//       </Formik>

//       <div className="image-wrapper">
//         <button
//           onClick={() => navigate("/")}
//           className="absolute top-4 right-4 border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
//         >
//           Close
//         </button>
//         <img src={assets.header_img} alt="auth" />
//       </div>
//     </div>
//   );
// };

// export default LoginPop;

// import React, { useState, useEffect } from "react";
// import "./LoginPop.css";
// import { assets } from "../../assets/assets";
// import { useAuth } from "../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { getAreas } from "../../services/api";
// import { signupApi, loginApi } from "../../services/authapi";
// import toast from "react-hot-toast";

// /* ================= VALIDATION ================= */

// const LoginSchema = Yup.object({
//   email: Yup.string().email("Invalid email").required("Email required"),
//   password: Yup.string().required("Password required"),
// });

// const SignupSchema = Yup.object({
//   name: Yup.string().required("Name required"),
//   email: Yup.string().email("Invalid email").required("Email required"),
//   password: Yup.string().min(6, "Min 6 chars").required("Password required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm password required"),
// });

// const ForgotPasswordSchema = Yup.object({
//   email: Yup.string().email("Invalid email").required("Email required"),
//   otp: Yup.string().length(6, "OTP must be 6 digits"),
//   newPassword: Yup.string().min(6, "Min 6 chars"),
//   confirmPassword: Yup.string().oneOf(
//     [Yup.ref("newPassword")],
//     "Passwords must match"
//   ),
// });

// /* ================= COMPONENT ================= */

// const LoginPop = () => {
//   const [currState, setCurrState] = useState("Login");
//   const [otpSent, setOtpSent] = useState(false);
//   const [areas, setAreas] = useState([]);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const isLogin = currState === "Login";
//   const isSignup = currState === "Sign Up";
//   const isForgot = currState === "Forgot";

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const fetchAreas = async () => {
//       try {
//         const res = await getAreas();
//         setAreas(res.data.meals);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchAreas();

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="login-pop auth-layout">
//       <Formik
//         initialValues={{
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           otp: "",
//           newPassword: "",
//         }}
//         validationSchema={
//           isLogin ? LoginSchema : isSignup ? SignupSchema : ForgotPasswordSchema
//         }
//         onSubmit={async (values, { setSubmitting, setErrors }) => {
//           let toastId;

//           try {
//             /* =============== SIGN UP =============== */
//             if (isSignup) {
//               toastId = toast.loading("Creating account...");

//               await signupApi({
//                 name: values.name,
//                 email: values.email,
//                 password: values.password,
//                 confirmPassword: values.confirmPassword,
//               });

//               toast.success("Signup successful 🎉", { id: toastId });
//               setCurrState("Login");
//               setOtpSent(false);
//               return;
//             }

//             /* =============== LOGIN =============== */
//             // if (isLogin) {
//             //   toastId = toast.loading("Logging in...");

//             //   const res = await loginApi({
//             //     email: values.email,
//             //     password: values.password,
//             //   });

//             //   localStorage.setItem("token", res.data.token);
//             //   login(res.data.user);

//             //   toast.success("Login successful ✅", { id: toastId });
//             //   navigate("/foodlist");
//             //   return;
//             // }

//             if (isLogin) {
//               toastId = toast.loading("Logging in...");

//               const res = await loginApi({
//                 email: values.email,
//                 password: values.password,
//               });

//               const userData = res.data.user; //  contains role
//               localStorage.setItem("token", res.data.token);

//               // store user in AuthContext
//               login(userData);

//               toast.success("Login successful ✅", { id: toastId });

//               if (userData.role === "admin") {
//                 navigate("/admin/users");
//               } else {
//                 navigate(`/${userData.id}/foodlist`);
//               }

//               return;
//             }

//             /* =============== FORGOT PASSWORD =============== */
//             if (isForgot) {
//               if (!otpSent) {
//                 toast.success("OTP sent to email 📩");
//                 setOtpSent(true);
//                 return;
//               }

//               toast.success("Password reset successful 🔐");
//               setCurrState("Login");
//               setOtpSent(false);
//             }
//           } catch (err) {
//             toast.error(err.response?.data?.message || "Something went wrong", {
//               id: toastId,
//             });

//             setErrors({
//               email: err.response?.data?.message || "Something went wrong",
//             });
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form className="form-container animate-fade-ins">
//             {/* TITLE */}
//             <div className="login-title">
//               <h2>{currState}</h2>
//             </div>

//             <div className="login-input">
//               {/* SIGN UP */}
//               {isSignup && (
//                 <>
//                   <Field name="name" placeholder="Your Name" />
//                   <ErrorMessage name="name" component="span" />
//                 </>
//               )}

//               {/* EMAIL */}
//               <Field name="email" placeholder="Your Email" />
//               <ErrorMessage name="email" component="span" />

//               {/* PASSWORD */}
//               {(isLogin || isSignup) && (
//                 <>
//                   <Field
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage name="password" component="span" />
//                 </>
//               )}

//               {/* FORGOT */}
//               {isForgot && otpSent && (
//                 <>
//                   <Field name="otp" placeholder="Enter OTP" />
//                   <Field
//                     type="password"
//                     name="newPassword"
//                     placeholder="New Password"
//                   />
//                   <Field
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                   />
//                 </>
//               )}

//               {/* CONFIRM PASSWORD */}
//               {isSignup && (
//                 <>
//                   <Field
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Re-enter Password"
//                   />
//                   <ErrorMessage name="confirmPassword" component="span" />
//                 </>
//               )}

//               {/* FORGOT LINK */}
//               {isLogin && (
//                 <p
//                   className="forgot-link"
//                   onClick={() => {
//                     setCurrState("Forgot");
//                     setOtpSent(false);
//                   }}
//                 >
//                   Forgot Password?
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="submit-btn"
//               disabled={isSubmitting}
//             >
//               {isSubmitting
//                 ? "Please wait..."
//                 : isLogin
//                 ? "Login"
//                 : isSignup
//                 ? "Signup"
//                 : otpSent
//                 ? "Reset Password"
//                 : "Send OTP"}
//             </button>

//             {/* FOOTER */}
//             {isLogin && (
//               <p className="footer-text">
//                 Create a new account?
//                 <span onClick={() => setCurrState("Sign Up")}> Click here</span>
//               </p>
//             )}

//             {isSignup && (
//               <p className="footer-text">
//                 Already have an account?
//                 <span onClick={() => setCurrState("Login")}> Login here</span>
//               </p>
//             )}

//             {isForgot && (
//               <p className="footer-text">
//                 Remember password?
//                 <span onClick={() => setCurrState("Login")}> Login</span>
//               </p>
//             )}
//           </Form>
//         )}
//       </Formik>

//       <div className="image-wrapper">
//         <button
//           onClick={() => navigate("/")}
//           className="absolute top-4 right-4 border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
//         >
//           Close
//         </button>
//         <img src={assets.header_img} alt="auth" />
//       </div>
//     </div>
//   );
// };

// export default LoginPop;
import React, { useState, useEffect } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAreas } from "../../services/api";
import { signupApi, loginApi } from "../../services/authapi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"; // ✅ ADD THIS

/* ================= VALIDATION ================= */

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

const SignupSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  otp: Yup.string().length(6, "OTP must be 6 digits"),
  newPassword: Yup.string().min(6, "Min 6 chars"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match"
  ),
});

/* ================= COMPONENT ================= */

const LoginPop = () => {
  const [currState, setCurrState] = useState("Login");
  const [otpSent, setOtpSent] = useState(false);
  const [areas, setAreas] = useState([]);

  const { login } = useAuth();
  const dispatch = useDispatch(); // ✅ ADD THIS
  const navigate = useNavigate();

  const isLogin = currState === "Login";
  const isSignup = currState === "Sign Up";
  const isForgot = currState === "Forgot";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fetchAreas = async () => {
      try {
        const res = await getAreas();
        setAreas(res.data.meals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAreas();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="login-pop auth-layout">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
          newPassword: "",
        }}
        validationSchema={
          isLogin ? LoginSchema : isSignup ? SignupSchema : ForgotPasswordSchema
        }
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          let toastId;

          try {
            /* =============== SIGN UP =============== */
            if (isSignup) {
              toastId = toast.loading("Creating account...");

              await signupApi({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
              });

              toast.success("Signup successful 🎉", { id: toastId });
              setCurrState("Login");
              setOtpSent(false);
              return;
            }

            /* =============== LOGIN =============== */
            if (isLogin) {
              toastId = toast.loading("Logging in...");

              const res = await loginApi({
                email: values.email,
                password: values.password,
              });

              const userData = res.data.user;
              localStorage.setItem("token", res.data.token);

              // ✅ AuthContext login
              login(userData);

              // ✅ REDUX ADMIN LOGIN
              if (userData.role === "admin") {
                dispatch({
                  type: "ADMIN_LOGIN_SUCCESS",
                  payload: {
                    email: userData.email,
                    name: userData.name || "Admin",
                  },
                });

                navigate("/admin/users");
              } else {
                // safety: remove admin if normal user logs in
                dispatch({ type: "ADMIN_LOGOUT" });
                navigate(`/${userData.id}/foodlist`);
              }

              toast.success("Login successful ✅", { id: toastId });
              return;
            }

            /* =============== FORGOT PASSWORD =============== */
            if (isForgot) {
              if (!otpSent) {
                toast.success("OTP sent to email 📩");
                setOtpSent(true);
                return;
              }

              toast.success("Password reset successful 🔐");
              setCurrState("Login");
              setOtpSent(false);
            }
          } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong", {
              id: toastId,
            });

            setErrors({
              email: err.response?.data?.message || "Something went wrong",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form-container animate-fade-ins">
            <div className="login-title">
              <h2>{currState}</h2>
            </div>

            <div className="login-input">
              {isSignup && (
                <>
                  <Field name="name" placeholder="Your Name" />
                  <ErrorMessage name="name" component="span" />
                </>
              )}

              <Field name="email" placeholder="Your Email" />
              <ErrorMessage name="email" component="span" />

              {(isLogin || isSignup) && (
                <>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="span" />
                </>
              )}

              {isForgot && otpSent && (
                <>
                  <Field name="otp" placeholder="Enter OTP" />
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                  />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </>
              )}

              {isSignup && (
                <>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                  />
                  <ErrorMessage name="confirmPassword" component="span" />
                </>
              )}

              {isLogin && (
                <p
                  className="forgot-link"
                  onClick={() => {
                    setCurrState("Forgot");
                    setOtpSent(false);
                  }}
                >
                  Forgot Password?
                </p>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait..."
                : isLogin
                ? "Login"
                : isSignup
                ? "Signup"
                : otpSent
                ? "Reset Password"
                : "Send OTP"}
            </button>

            {isLogin && (
              <p className="footer-text">
                Create a new account?
                <span onClick={() => setCurrState("Sign Up")}> Click here</span>
              </p>
            )}

            {isSignup && (
              <p className="footer-text">
                Already have an account?
                <span onClick={() => setCurrState("Login")}> Login here</span>
              </p>
            )}

            {isForgot && (
              <p className="footer-text">
                Remember password?
                <span onClick={() => setCurrState("Login")}> Login</span>
              </p>
            )}
          </Form>
        )}
      </Formik>

      <div className="image-wrapper">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Close
        </button>
        <img src={assets.header_img} alt="auth" />
      </div>
    </div>
  );
};

export default LoginPop;
