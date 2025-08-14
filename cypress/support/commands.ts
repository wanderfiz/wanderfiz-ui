/// <reference types="cypress" />

// Custom commands for Cypress
declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command types here
    }
  }
}

// Example custom command
// Cypress.Commands.add('login', (email: string, password: string) => {
//   cy.session([email, password], () => {
//     cy.visit('/login');
//     cy.get('[data-cy="email"]').type(email);
//     cy.get('[data-cy="password"]').type(password);
//     cy.get('[data-cy="submit"]').click();
//   });
// });