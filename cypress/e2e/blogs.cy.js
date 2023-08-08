describe('Blog App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('fornt end page can be opend', () => {
    cy.contains('Helsinki university full stack open course 2023');
  });

  it('login form can be opend', () => {
    cy.contains('login').click();
  });

  it('user can be login', () => {
    cy.contains('login').click();
    cy.get('#username').type('hasan91');
    cy.get('#password').type('hasan123');
    cy.get('#loginButton').click();
    cy.contains('Hasan is Logged in');
  });

  describe('when loged in', () => {
    beforeEach(() => {
      cy.contains('login').click();
      cy.get('#username').type('hasan91');
      cy.get('#password').type('hasan123');
      cy.get('#loginButton').click();
      cy.contains('Hasan is Logged in');
    });
    it('a new note can be created', () => {
      cy.contains('Create').click();
      cy.get('#title').type('testblog');
      cy.get('#author').type('testauthor');
      cy.get('#url').type('testurl');
      cy.get('#createButton').click();
      cy.contains('testblog');
      cy.contains('testauthor');
      cy.contains('testurl');
    });
  });
});
