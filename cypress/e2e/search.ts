/// <reference types= "cypress"/>

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the website", () => {
  cy.visit(Cypress.env('georgeHome'));
});

When("I enter my username and password", () => {
  cy.fixture('credentials.json').then((credentials) => {
    cy.get('[name="j_username"]').type(credentials.username)
    cy.get('input[type="submit"]').click()
    cy.get('[name="j_password"]').type(credentials.password)
  })
});

Then("I click the login button", () => {
  cy.get('input[type="submit"]').click()
});

Then("I should be logged in", () => {
  cy.url().should('include', '/overview');
  cy.get('[data-cy="nav-logout"]').should('exist').and('be.visible')
 });

 Given("Search bar is available", () => {
  cy.get('[data-cy="transactions-history-search-bar"]').should('exist').and('be.visible')
});

 When("I type keyword {string} into search bar", (searchWord) => {
  cy.get('[data-cy="search-keyword"]').type(`${searchWord}`)
});

When("I click search button", () => {
  cy.intercept('**/transactions*').as('trans')
  cy.get('[data-cy="search-trigger-button"]').click()
  cy.wait('@trans')
});

Then("I check if each transaction contains the {string} category", (searchWord) => {
  cy.get('[data-cy="transactions-search-summary"]').should('exist').and('be.visible')
  cy.get('[data-cy="transactions-history-sticky-search-group"]').should('exist').and('be.visible')

  cy.get('[data-chunk="end"] > a').click().wait(500)
  cy.scrollTo('bottom').wait(500)
  cy.get('tr*[data-cy^="transaction-list-item"]').eq(-1).scrollIntoView().wait(500)

  cy.get('tr*[data-cy^="transaction-list-item"]').each((transaction) => {
      cy.wrap(transaction).find('.g-badge-category').should('contain.text', searchWord);
    });
 });

 Then("The sum of all transactions equals the summary value", () => {
  cy.get('[data-cy="transactions-search-summary"]').should('exist').and('be.visible')
  cy.get('[data-cy="transactions-history-sticky-search-group"]').should('exist').and('be.visible')

  cy.get('[data-chunk="end"] > a').click().wait(500)
  cy.scrollTo('bottom').wait(500)
  cy.get('tr*[data-cy^="transaction-list-item"]').eq(-1).scrollIntoView().wait(500)

  cy.get('[data-cy="transactions-search-summary"]').find('data').invoke('attr', 'value').then((totalValueText) => {
    const totalValue = parseFloat(`${totalValueText}`);
    let sum = 0;

    cy.get('tr*[data-cy^="transaction-list-item"]').each((transaction) => {
      cy.wrap(transaction).find('.g-amount-data').invoke('attr', 'value').then((transactionValueText) => {
        const transactionValue = parseFloat(`${transactionValueText}`);
        sum += transactionValue;
      })
    })
    .then(() => {
      cy.log(`Sum: ${sum}, Total Value: ${totalValue}`);
      expect(sum).to.be.closeTo(totalValue, 0.01);
    })
  })
 });

 Then("Number of transactions matches the summary", () => {
  cy.get('[data-chunk="end"] > a').click().wait(500)
  cy.scrollTo('bottom').wait(500)
  cy.get('tr*[data-cy^="transaction-list-item"]').eq(-1).scrollIntoView().wait(500)
  
  cy.contains('In total').parent().invoke('text').then((text) => {
    const totalNum = parseFloat(text.replace(/\D/g,''));

    cy.get('tr*[data-cy^="transaction-list-item"]').then((value) => {
            const length = value.length
            expect(totalNum).to.eq(length)
    })
  })
 });


 

 


