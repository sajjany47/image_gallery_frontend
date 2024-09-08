import { Button } from "primereact/button";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Loader from "./Loader";
import { InputField } from "./FieldType";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../apiService";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const apiService = new ApiService();

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
  });

  const handelSubmit = (values) => {
    console.log(values);
    setLoading(true);
    apiService
      .signUp(values)
      .then((res) => {
        setLoading(false);

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("data", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: error?.data?.message || error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="mt-8">
      {loading && <Loader />}
      <Formik
        initialValues={{ username: "", password: "", name: "", email: "" }}
        onSubmit={handelSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex align-items-center justify-content-center">
              <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
                <div className="text-center mb-5">
                  <img
                    src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721898000&semt=sph"
                    alt="hyper"
                    height={50}
                    className="mb-3"
                  />
                  <div className="text-900 text-3xl font-medium mb-3">
                    Welcome Back
                  </div>
                  <span className="text-600 font-medium line-height-3">
                    {"Already an account?"}
                  </span>
                  <a
                    className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login!
                  </a>
                </div>

                <div>
                  <Field
                    label="Username"
                    component={InputField}
                    name={"username"}
                  />
                  <Field label="Name" component={InputField} name={"name"} />
                  <Field label="Email" component={InputField} name={"email"} />
                  <Field
                    label="Password"
                    component={InputField}
                    name={"password"}
                    type="password"
                  />

                  <Button
                    label="Sign Up"
                    className="w-full"
                    type="submit"
                    onClick={handelSubmit}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
