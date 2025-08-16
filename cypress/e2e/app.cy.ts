describe('WanderFiz App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the application', () => {
    cy.contains('WanderFiz');
  });

  it('has proper page title', () => {
    cy.title().should('include', 'Wanderfiz');
  });
});