Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(function ({ body }) {
    localStorage.setItem('Bloguser', JSON.stringify(body));
    cy.visit('http://localhost:3000/');
  });
});

Cypress.Commands.add('create', function ({ title, author, url }) {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('Bloguser')).token
      }`,
    },
  });
});
