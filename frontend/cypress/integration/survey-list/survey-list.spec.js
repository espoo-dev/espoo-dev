context('survey list', () => {
  const login = {
    email: 'student@gmail.com',
    password: '123456',
  };

  it('Should open survey page when click on Surveys Item', () => {
    cy.globalLogin(login);
    cy.contains('Surveys').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/surveys`);
  });

  it('Should has status code 200 when click on refresh button', () => {
    cy.globalLogin(login);
    cy.contains('Surveys').click();
    cy.wait(1000);
    cy.intercept('GET', '**/api/v1/surveys*').as('getSurvey');
    cy.get('.css-70qvj9 > .chakra-button').click();
    cy.wait('@getSurvey').its('response.statusCode').should('be.equal', 200);
  });

  it('Must log out when click on log out button', () => {
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });
});
