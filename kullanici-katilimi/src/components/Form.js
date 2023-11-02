import React from "react";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function SignForm() {
  const fromDataInitial = {
    name: "",
    email: "",
    password: "",
    checkbox: false,
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required()
      .notOneOf(
        ["waffle@syrup.com"],
        "this email address has already been used"
      ),
    password: Yup.string()
      .min(4, "the password cannot be shorter than 4 characters")
      .max(10, "the password cannot be longer than 10 characters")
      .required(),
    checkbox: Yup.boolean().oneOf([true]),
  });

  const createUser = (e) => {
    e.preventDefault();

    if (formValid) {
      console.log("Form eklendi! ", formData);
    }
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

  const [formData, setFormData] = useState(fromDataInitial);
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const [formValid, setFormValid] = useState(true);

  // useEffect(() => {
  //   console.error("form err > ", formError);
  // });

  useEffect(() => {
    userSchema.isValid(formData).then((valid) => setFormValid(valid));
  }, [formData]);

  return (
    <div className="container fluid">
      <div>
        <h2>Create account:</h2>
        <hr />
      </div>
      <Form onSubmit={createUser}>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-name" className="col-sm-1 col-form-label">
            Name
          </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Name..."
            className="form-control"
            isInvalid={!!formError.name}
          />
          <Form.Control.Feedback type="invalid">
            {formError.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-mail" className="col-sm-1 col-form-label">
            Email
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="example@email.com"
            className="form-control"
            isInvalid={!!formError.email}
          />
          <Form.Control.Feedback type="invalid">
            {formError.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-pass" className="col-sm-1 col-form-label">
            Password
          </Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="password123"
            className="form-control"
            isInvalid={!!formError.password}
          />
          <Form.Control.Feedback type="invalid">
            {formError.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Check
            name="checkbox"
            type="checkbox"
            onChange={changeHandler}
            checked={formData.checkbox}
          />
          <Form.Label>I accept the terms of service.</Form.Label>
        </Form.Group>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </div>
  );
}
export default SignForm;
