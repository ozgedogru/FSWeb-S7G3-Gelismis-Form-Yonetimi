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
    <div>
      <div>
        <h2>Create account:</h2>
      </div>
      <form onSubmit={createUser}>
        <div>
          <label htmlFor="user-name">Full Name</label>
          <input
            name="name"
            type="text"
            onChange={changeHandler}
            placeholder="Name..."
          />
        </div>
        <div>
          <label htmlFor="user-mail">Email</label>
          <input
            name="email"
            type="email"
            onChange={changeHandler}
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label htmlFor="user-pass">Password</label>
          <input
            name="password"
            type="password"
            onChange={changeHandler}
            placeholder="password123"
          />
        </div>
        <div>
          <label>I accept the terms of service.</label>
          <input type="checkbox" onChange={changeHandler} checkbox={""}></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Form;
