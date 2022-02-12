let faker = require('faker')
context('register page', () => {
    
    it('Should open the registration page by clicking on the registration item', () => {
        cy.visit(`/login`);
        cy.get('[id="btn-register"]').click();
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/register`);
      });

    it('Should must successfully register as a teacher ', ()=> {
      cy.visit('/register')
      cy.get('[data-testid="email-register"]').type(faker.internet.email());
      cy.get('[data-testid="password-register"]').type("123456");
      cy.contains('span[class="chakra-radio__label css-1i66d7g"]', 'teacher').click();
      cy.get('[data-testid="register-btn"]').click();
      cy.get('div[class="Toastify__toast-body"]').should("have.text","Successfully registered, now you can log in");  
    }); 

  });