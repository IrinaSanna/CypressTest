describe("Electronic library", () => {
  beforeEach(() => {
  cy.visit("/");
})

  it("Should open the main page", () => {
    cy.contains("Books list");
  });

  it("Authorization in your personal account", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("Should not login with empty password", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Should not login with empty email", () => {
    cy.login(null, "123");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Should add book to favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.get(".card-footer > .btn").click();
    cy.contains("Delete from favorite").should("be.visible", true);
  });

  it("Should remove book from favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.get(".card-footer > .btn").click();
    cy.contains("Add to favorite").should("be.visible", true);
  });

  it("Should get information about book", () => {
    cy.login("bropet@mail.ru", "123");
    cy.get(".card-body").click();
    cy.contains("Dowload book").should("be.visible", true);
  });
});