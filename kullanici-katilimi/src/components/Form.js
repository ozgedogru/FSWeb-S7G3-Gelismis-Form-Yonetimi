import React from "react";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function SignForm() {
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
      <Form onSubmit={createUser}>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-name" className="col-sm-1 col-form-label">
            Name
          </Form.Label>
          <Form.Control
            name="name"
            type="text"
            onChange={changeHandler}
            placeholder="Name..."
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-mail" className="col-sm-1 col-form-label">
            Email
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={changeHandler}
            placeholder="example@email.com"
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Label htmlFor="user-pass" className="col-sm-1 col-form-label">
            Password
          </Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={changeHandler}
            placeholder="password123"
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="row mb-3">
          <Form.Check
            name="active"
            type="checkbox"
            label="Aktif mi?"
            onChange={changeHandler}
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </div>
  );
}
export default SignForm;
