describe('e2e', () => {
  describe('Give Consent', () => {
    beforeEach(() => cy.visit('/'));
    it('should render give-consent page', () => {
      cy.get('.mat-drawer-inner-container').should('be.visible');
      cy.get('consent-flow-give-consent').should('be.visible');
    });
    it('should add new consent', () => {
      cy.getDataAttribute('buttonSaveConsent').as('saveConsentButton');
      cy.get('@saveConsentButton').should('be.disabled');
      cy.getDataAttribute('receiveNewsLetter').click();
      cy.get('@saveConsentButton').should('be.enabled').click();
      // There should be a mat-error because the email and name are required
      cy.get('mat-error')
        .as('matErrors')
        .should('have.length', 2)
        .should('contain.text', 'Name is required')
        .should('contain.text', 'Email is required');

      // Fill in name
      cy.getDataAttribute('inputName').as('inputName').type('Jan Doe');

      cy.get('@matErrors').should('have.length', 1).should('contain.text', 'Email is required');

      // Fill in email
      cy.getDataAttribute('inputEmail').as('inputEmail').type('jan.doe@hotmail.com');

      cy.get('@matErrors').should('have.length', 0);

      cy.get('@saveConsentButton').click();

      cy.get('consent-flow-collected-consents').should('be.visible');
      cy.get('consent-flow-consent-table').should('be.visible');
      cy.getDataAttribute('cell-name')
        .as('consentCellName')
        .should('be.visible')
        .should('have.length', 2)
        .should('contain.text', 'John Doe')
        .should('contain.text', 'Jane Smith');

      // Check if the consent is added to the table
      cy.getDataAttribute('lastPage').click();
      cy.get('@consentCellName').should('be.visible').should('have.length', 1).should('contain.text', 'Jan Doe');

      cy.getDataAttribute('cell-email')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', 'jan.doe@hotmail.com');
      cy.getDataAttribute('cell-consentGiven')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', 'Received newsletter');
    });
  });
});
