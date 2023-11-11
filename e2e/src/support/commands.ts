// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getDataAttribute(attribute: string): Chainable;
  }
}

Cypress.Commands.add('getDataAttribute', (attribute: string) => {
  return cy.get(`[data-cy=${attribute}]`);
});
