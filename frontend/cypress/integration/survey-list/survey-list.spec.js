context('survey list', () => {
  const login = {
    email: 'student@gmail.com',
    password: '123456',
  };

  before(() => {
    cy.visit(`/login`);
  });

  it('Should open survey page', () => {
    cy.globalLogin(login);
    cy.contains('Surveys').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/surveys`);
  });

  it('Should click refresh button and check call api', () => {
    cy.visit(`/login`);
    cy.globalLogin(login);
    cy.contains('Surveys').click();
    cy.wait(1000);
    cy.intercept('GET', '**/api/v1/surveys*').as('getSurvey');
    cy.get('.css-70qvj9 > .chakra-button').click();
    cy.wait('@getSurvey').its('response.statusCode').should('be.equal', 200);
  });

  it('Must log out', () => {
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`);
  });
});
