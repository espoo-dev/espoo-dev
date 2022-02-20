/// <reference types="cypress" />

context('Login test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should have all fields and validate values', () => {
    const email = 'admin@gmail.com';
    const password = '123456';

    cy.get('#btn-register').should('be.visible');
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#password').type(password).should('have.value', password);
  });

  it('try login with invalid user', () => {
    cy.intercept('https://espoo-staging.herokuapp.com/users/sign_in*').as(
      'sign_in'
    );

    cy.get('#email').type('invaliduser@gmail.com');

    cy.get('#password').type('maybeiscorrectpassword');

    cy.get('#btn-login').click();

    cy.wait('@sign_in').then((res, _) => {
      expect(res.response.statusCode).to.be.eql(401);
    });
  });

  it('should do login and check has logout button', () => {
    cy.intercept('https://espoo-staging.herokuapp.com/users/sign_in*').as(
      'sign_in'
    );

    cy.get('#email').type('admin@gmail.com');

    cy.get('#password').type('123456');

    cy.get('#btn-login').click();

    cy.wait('@sign_in').then((res, _) => {
      expect(res.response.statusCode).to.be.eql(200);
    });
  });
});
