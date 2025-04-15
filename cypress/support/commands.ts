declare namespace Cypress {
    interface Chainable<Subject = any> {
        showAllTransactions(): Chainable<any>;
    }
}

Cypress.Commands.add('showAllTransactions', () => {
    cy.get('[data-chunk="end"] > a').click().wait(500)
    cy.scrollTo('bottom').wait(500)
    cy.get('tr*[data-cy^="transaction-list-item"]').eq(-1).scrollIntoView().wait(500)
    cy.contains('Loading more transfers...').should('not.exist')
})