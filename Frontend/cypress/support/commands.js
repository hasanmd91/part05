Cypress.Commands.add('login', ({ username, password }) => {
  // Log in the user and visit the main page
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    expect(body).to.have.property('token');
    localStorage.setItem('loggedInBlogAppUser', JSON.stringify(body));
    cy.wait(1000);

    cy.visit('http://localhost:3000/');
  });
});
