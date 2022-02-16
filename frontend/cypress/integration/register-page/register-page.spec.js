import RegisterFactory from "../../factories/RegisterFactory";
import RegisterPage from "../../pages/RegisterPage"

context('register page', () => {
    
  it('Should open the registration page by clicking on the registration item', () => {
    cy.visit(`/login`);
    cy.get('[id="btn-register"]').click();
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/register`);
  });

  it('Should successfully register as a teacher', ()=> {
    let register = RegisterFactory.registerData();
    RegisterPage.register(register);
  }); 

  it('Should register as student', ()=> {
    let register = RegisterFactory.registerData();
    register.roles = 'student';
    RegisterPage.register(register);
  });

  it('Should alert e-mail already registered when a student with the same e-mail has been registered', ()=> {
    let register = RegisterFactory.registerData();
    register.email = 'testedoteste23456@gmail.com';
    register.roles = 'student';
    register.alert_msg = 'Validation failed: Email has already been taken';
    RegisterPage.register(register);
  });

  it('Should alert e-mail already registered when a teacher with the same e-mail has been registered', ()=> {
    let register = RegisterFactory.registerData();
    register.email = 'testedoteste23455@gmail.com';
    register.roles = 'teacher';
    register.alert_msg = 'Validation failed: Email has already been taken';
    RegisterPage.register(register);
  });

});