/// <reference types="cypress" />

context('Login test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/login');
  });

  it('should show register button', () => {
    cy.get('#btn-register');
  });

  it('should show and type email', () => {
    cy.get('#email')
      .type('admin@gmail.com')
      .should('have.value', 'admin@gmail.com');
  });

  it('should show and type password', () => {
    cy.get('#password')
      .type('123456')
      .should('have.value', '123456');
  });

  it('try login with invalid user', () => {
    cy.intercept('https://espoo.herokuapp.com/users/sign_in*').as('sign_in');

    cy.get('#email')
      .type('invaliduser@gmail.com');

    cy.get('#password')
      .type('maybeiscorrectpassword');

    cy.get('#btn-login')
      .click();

    cy.wait('@sign_in').then(
      (res, _) => {
        cy.expect(res.response.statusCode).to.be.eql(401);
      }
    );
  });

  it('should do login and check has logout button', () => {
    cy.intercept('https://espoo.herokuapp.com/users/sign_in*').as('sign_in');

    cy.get('#email')
      .type('admin@gmail.com');

    cy.get('#password')
      .type('123456');

    cy.get('#btn-login')
      .click();

    cy.wait('@sign_in').then(
      (res, _) => {
        cy.expect(res.response.statusCode).to.be.eql(200);
      }
    );
  });
});
