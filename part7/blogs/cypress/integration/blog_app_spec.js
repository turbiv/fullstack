Cypress.Commands.add("addBlog", function(){
  cy.contains("Create new blog").click();
  cy.get("#title").type("cypress test title");
  cy.get("#url").type("cypress test url");
  cy.get("#author").type("cypress test author");
  cy.contains("Submit").click();
});

describe('Blogs ', function() {
  beforeEach(function(){
    cy.request("POST", 'http://localhost:3003/api/testing/reset');
    const user = {
      name: "Ivan Turbin",
      username: "turbiv",
      password: "testing"
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
    cy.get("input:first")
      .type("turbiv");
    cy.get("input:last")
      .type("testing");
    cy.contains("Login").click();
  });

  it('front page can be opened', function() {
    cy.contains("Ivan Turbin logged in")
  });

  it("create new blog and delete", function(){
    cy.addBlog();
    cy.contains("cypress test title by Ivan Turbin").click();
    cy.contains("Delete").click();
    cy.contains("Ivan Turbin logged in")
  });

  it("like and comment", function(){
    cy.addBlog();
    cy.contains("cypress test title by Ivan Turbin").click();
    cy.get("input:first").type("cool comment cyprus");
    cy.contains("Add Comment").click();
    cy.contains("cool comment cyprus");
    cy.contains("Like").click();
    cy.contains("Likes: 1");
    cy.contains("Url: cypress test url");
    cy.contains("cypress test title")
  });

  it('Check userpage and user data', function() {
    cy.addBlog();
    cy.contains("Users").click();
    cy.get("#turbiv").click();
    cy.contains("cypress test title")
  });

  it('Check notification', function() {
    cy.addBlog();
    cy.contains("A new blog cypress test title by cypress test author was added!")
  });

  it('logout', function() {
    cy.contains("Ivan Turbin logged in");
    cy.contains("Logout").click();
    cy.contains("Login")
  });
});