import RegisterFactory from "../../factories/RegisterFactory";
import RegisterPage from "../../pages/RegisterPage"
context('register page', () => {
    
    it('Should open the registration page by clicking on the registration item', () => {
        cy.visit(`/login`);
        cy.get('[id="btn-register"]').click();
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/register`);
      });

    it('Should must successfully register as a teacher', ()=> {
      let register = RegisterFactory.registerData();
      RegisterPage.register(register);
    }); 

    it('Should must successfully register as a student', ()=> {
      let register = RegisterFactory.registerData();
      register.roles = '202';
      RegisterPage.register(register);
    });

    it('Should must alert register email has already been taken as a student', ()=> {
      let register = RegisterFactory.registerData();
      register.email = 'testedoteste23456@gmail.com';
      register.roles = '202';
      register.alert_msg = 'Validation failed: Email has already been taken';
      RegisterPage.register(register);
      });

      it('Should must alert register email has already been taken as a teacher', ()=> {
        let register = RegisterFactory.registerData();
        register.email = 'testedoteste23455@gmail.com';
        register.roles = '201';
        register.alert_msg = 'Validation failed: Email has already been taken';
        RegisterPage.register(register);
        });

  });