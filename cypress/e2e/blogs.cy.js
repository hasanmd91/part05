describe('Blog App', function () {
  const user01 = {
    name: 'Hasan',
    username: 'hasan91',
    password: 'hasan123',
  };

  const user02 = {
    name: 'Hasan',
    username: 'hasan92',
    password: 'hasan1234',
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', user01);
    cy.request('POST', 'http://localhost:3001/api/users', user02);
    cy.visit('http://localhost:3000/');
  });

  describe('login', function () {
    it('fornt end page can be opend', function () {
      cy.contains('Helsinki university full stack open course 2023');
    });

    it('Login form is shown', function () {
      cy.contains('login').click();
      cy.contains('Username');
      cy.contains('password');
      cy.contains('Login');
    });

    it('succeeds with correct credentials ', function () {
      cy.contains('login').click();
      cy.get('#username').type(user01.username);
      cy.get('#password').type(user01.password);
      cy.get('#loginButton').click();
      cy.contains('Hasan is Logged in');
    });

    it('fails with wrong credentials ', function () {
      cy.contains('login').click();
      cy.get('#username').type(user01.username);
      cy.get('#password').type('wrong');
      cy.get('#loginButton').click();
      cy.get('.error').contains('wrong username or password');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'hasan91',
        password: 'hasan123',
      }).then((response) => {
        localStorage.setItem('bloguser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('a new note can be created', function () {
      cy.contains('create new blog').click();
    });

    // ...
  });
});
