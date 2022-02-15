class RegisterPage{

    register(register){
      cy.visit('/register')
      cy.get('[data-testid="email-register"]').type(register.email);
      cy.get('[data-testid="password-register"]').type(register.password);
      cy.get(`[data-testid="${register.roles}"]`,{ timeout: 10000 }).click();
      cy.get('[data-testid="register-btn"]').click();
      cy.get('div[class="Toastify__toast-body"]').should("have.text",register.alert_msg); 
    }
}

export default new RegisterPage() 