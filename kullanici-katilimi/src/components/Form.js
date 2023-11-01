function Form() {
  return (
    <div>
      <div>
        <h2>Create account:</h2>
      </div>
      <form onSubmit={() => {}}>
        <div>
          <label htmlFor="user-name">Full Name</label>
          <input id="user-name" type="text" placeholder="Name..." />
        </div>
        <div>
          <label htmlFor="user-mail">Email</label>
          <input id="user-mail" type="email" placeholder="example@email.com" />
        </div>
        <div>
          <label htmlFor="user-pass">Password</label>
          <input id="user-pass" type="password" placeholder="password123" />
        </div>
        <div>
          <label>I accept the terms of service.</label>
          <input type="checkbox" checkbox={false}></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Form;
