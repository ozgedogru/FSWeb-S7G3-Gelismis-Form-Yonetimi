import React from "react";
import * as Yup from "yup";
import { useState, useEffect } from "react";

function Form() {
  const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(4, "The password cannot be shorter than 4 characters.")
      .max(10, "The password cannot be longer than 10 characters.")
      .required(),
    checkbox: Yup.boolean(),
  });

  const createUser = (e) => {
    e.preventDefault();

    let formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      checkbox: e.target[3].value,
    };
    console.log("formData > ", formData);
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    Yup.reach(userSchema, name)
      .validate(type === "checkbox" ? checked : value)
      .then((valid) => {
        setFormError({ ...formError, [name]: "" });
      })
      .catch((err) => {
        setFormError({ ...formError, [name]: err.errors[0] });
      });
  };

  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    console.error("form err > ", formError);
  });

  useEffect(() => {
    userSchema.isValid(formData).then((valid) => setFormValid(valid));
  }, [formData]);

  return (
    <div class="container fluid">
      <div>
        <h2>Create account:</h2>
        <hr />
      </div>
      <form onSubmit={createUser}>
        <div className="row mb-3">
          <label htmlFor="user-name" className="col-sm-1 col-form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={changeHandler}
            placeholder="Name..."
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="user-mail" className="col-sm-1 col-form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            onChange={changeHandler}
            placeholder="example@email.com"
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="user-pass" className="col-sm-1 col-form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={changeHandler}
            placeholder="password123"
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <div className="col-auto">
            <div className="form-check">
              <label htmlFor="checkbox" className="form-check-label">
                I accept the terms of service.
              </label>
              <input
                name="checkbox"
                type="checkbox"
                onChange={changeHandler}
                checkbox={""}
                className="form-check-input"
              ></input>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default Form;
