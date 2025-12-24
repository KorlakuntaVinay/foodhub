import React, { useState, useEffect } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAreas } from "../../services/api"; // your api.js

//  Login validation
const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

//  Signup validation
const SignupSchema = Yup.object({
  name: Yup.string().required("Name required"),
  country: Yup.string().required("Country required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
  otp: Yup.string().length(6, "OTP must be 6 digits"),
});

const LoginPop = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [otpSent, setOtpSent] = useState(false);
  const [areas, setAreas] = useState([]); // for API areas

  const { login } = useAuth();
  const navigate = useNavigate();

  // Fetch areas from API on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fetchAreas = async () => {
      try {
        const res = await getAreas();
        setAreas(res.data.meals); // API returns { meals: [ { strArea: '...' }, ... ] }
      } catch (err) {
        console.error("Failed to fetch areas:", err);
      }
    };

    fetchAreas();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isLogin = currState === "Login";

  return (
    <div className="login-pop">
      <Formik
        initialValues={{
          name: "",
          email: "",
          country: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          otp: "",
        }}
        validationSchema={isLogin ? LoginSchema : SignupSchema}
        onSubmit={(values) => {
          if (!isLogin && !otpSent) {
            alert("OTP Sent to " + values.mobile);
            setOtpSent(true);
            return;
          }

          login({ name: values.name || "User" });
          setShowLogin(false);
          navigate("/foodlist");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="form-container animate-fade-ins">
            <div className="login-title">
              <h2>{currState}</h2>
              <img
                src={assets.cross_icon}
                alt="close"
                onClick={() => setShowLogin(false)}
              />
            </div>

            <div className="login-input">
              {/* SIGN UP FIELDS */}
              {!isLogin && (
                <>
                  <div className="relative">
                    <Field
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <span className="absolute right-2 top-1 text-red-500 text-sm">
                          {msg}
                        </span>
                      )}
                    />
                  </div>

                  {/* COUNTRY SELECT FROM API */}
                  <div className="relative">
                    <Field name="country">
                      {({ field }) => (
                        <select
                          {...field}
                          className="w-full p-2 border rounded"
                          onChange={(e) =>
                            setFieldValue("country", e.target.value)
                          }
                        >
                          <option value="">Select Country</option>
                          {areas?.map((a) => (
                            <option key={a.strArea} value={a.strArea}>
                              {a.strArea}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="country"
                      render={(msg) => (
                        <span className="absolute right-2 top-1 text-red-500 text-sm">
                          {msg}
                        </span>
                      )}
                    />
                  </div>

                  <div className="relative">
                    <Field
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="mobile"
                      render={(msg) => (
                        <span className="absolute right-2 top-1 text-red-500 text-sm">
                          {msg}
                        </span>
                      )}
                    />
                  </div>
                </>
              )}

              {/* COMMON FIELDS */}
              <div className="relative">
                <Field
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <span className="absolute right-2 top-1 text-red-500 text-sm">
                      {msg}
                    </span>
                  )}
                />
              </div>

              <div className="relative">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <span className="absolute right-2 top-1 text-red-500 text-sm">
                      {msg}
                    </span>
                  )}
                />
              </div>

              {/* SIGN UP EXTRA */}
              {!isLogin && (
                <>
                  <div className="relative">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter Password"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      render={(msg) => (
                        <span className="absolute right-2 top-1 text-red-500 text-sm">
                          {msg}
                        </span>
                      )}
                    />
                  </div>

                  {otpSent && (
                    <div className="relative">
                      <Field
                        name="otp"
                        placeholder="Enter OTP"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="otp"
                        render={(msg) => (
                          <span className="absolute right-2 top-1 text-red-500 text-sm">
                            {msg}
                          </span>
                        )}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
            >
              {isLogin ? "Login" : otpSent ? "Verify OTP & Signup" : "Send OTP"}
            </button>

            {isLogin ? (
              <p className="mt-2 text-center">
                Create a new account?
                <span
                  className="text-blue-500 cursor-pointer ml-1"
                  onClick={() => setCurrState("Sign Up")}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p className="mt-2 text-center">
                Already have an account?
                <span
                  className="text-blue-500 cursor-pointer ml-1"
                  onClick={() => setCurrState("Login")}
                >
                  Login here
                </span>
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPop;
