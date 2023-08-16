describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Hasan',
      username: 'hasan91',
      password: 'hasan123',
    };

    const user2 = {
      name: 'ilhaan',
      username: 'ilhaan22',
      password: 'ilhaan123',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('Helsinki university full stack open course 2023');
  });

  it('succeeds with correct credentials', function () {
    cy.contains('login').click();
    cy.get('#username').type('hasan91');
    cy.get('#password').type('hasan123');
    cy.contains('Login').click();
    cy.contains('Hasan is Logged in');
  });

  it('fails with wrong credentials', function () {
    cy.contains('login').click();
    cy.get('#username').type('hasan91');
    cy.get('#password').type('wrongpassword');
    cy.contains('Login').click();
    cy.get('.error').should('contain.text', 'wrong username or password');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hasan91', password: 'hasan123' });
      cy.visit('http://localhost:3000');
      cy.contains('login').click();
      cy.get('#username').type('hasan91');
      cy.get('#password').type('hasan123');
      cy.contains('Login').click();
      cy.contains('Hasan is Logged in');
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.contains('Title').type('Visit london');
      cy.contains('Author').type('ilhaan');
      cy.contains('Url').type('ilhaan.com');
      cy.get('#createButton').click();
      cy.get('.success').should(
        'contain.text',
        'A new blog Visit london by ilhaan is added'
      );
      cy.contains('Show').click();
      cy.contains('likes 0');
      cy.contains('Like').click();
      cy.contains('likes 1');
      cy.contains('Delete').click();
    });
  });
});
