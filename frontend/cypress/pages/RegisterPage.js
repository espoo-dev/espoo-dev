export default class RegisterPage {
  constructor(data) {
    this.data = data;
  }

  register() {
    cy.visit('/register');
    cy.get('[data-testid="email-register"]').type(this.data.email);
    cy.get('[data-testid="password-register"]').type(this.data.password);
    cy.get('[data-testid="rolesRegister"]', { timeout: 20000 })
      .contains(this.data.roles)
      .click();
    cy.get('[data-testid="register-btn"]').click();
    cy.get('div[class="Toastify__toast-body"]').should(
      'have.text',
      this.data.alert_msg
    );
  }
}
