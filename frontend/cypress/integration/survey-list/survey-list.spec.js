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

  it('Should has status code 200 or 304 when click on refresh button', () => {
    cy.globalLogin(login);
    cy.contains('Surveys').click();
    cy.wait(1000);
    cy.intercept('GET', '**/api/v1/surveys*').as('getSurvey');
    cy.get('[data-testid="refresh-survey-lit"]').click();
    cy.wait('@getSurvey').its('response.statusCode').should('match', /^(200|304)/);
  });

  it('Must log out when click on log out button', () => {
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });
});
