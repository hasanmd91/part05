Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', 'http://localhost:3001/api/login/', {
    username,
    password,
  }).then(function ({ body }) {
    localStorage.setItem('loggeduser', JSON.stringify(body));
  });
});
