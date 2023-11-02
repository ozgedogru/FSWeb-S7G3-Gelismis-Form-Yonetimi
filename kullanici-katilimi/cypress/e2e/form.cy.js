describe("Create Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Email Engel Testi", () => {
    cy.get("#email-input").type("waffle@syrup.com");

    cy.get("#email-validation")
      .should("be.visible")
      .should("have.text", "this email address has already been used");
  });

  it("Parola Uzunlugu Testi", () => {
    cy.get("#password-input").type("123");

    cy.get("#password-validation")
      .should("be.visible")
      .should("have.text", "the password cannot be shorter than 4 characters");

    cy.get("#password-input").type("12345678910");

    cy.get("#password-validation")
      .should("be.visible")
      .should("have.text", "the password cannot be longer than 10 characters");
  });

  it("Kullanim Kosullari Onay Testi", () => {
    cy.get("#check-input").click();

    cy.get("#check-input").should("have.visible");
  });
});
