describe('Wanderfiz App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the application', () => {
    cy.contains('Wanderfiz');
  });

  it('has proper page title', () => {
    cy.title().should('include', 'Wanderfiz');
  });
});