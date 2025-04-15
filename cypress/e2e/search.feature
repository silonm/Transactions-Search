Feature: Search functionality
  Transactions Search test

  Background: Successful login
    Given I open the website
    When I enter my username and password
    And I click the login button
    Then I should be logged in

  Scenario: Check that each transaction contains searched category
    Given Search bar is available
    When I type keyword "Fashion" into search bar
    And I click search button
    Then I check if each transaction contains the "Fashion" category

  Scenario: Verify that the sum of all transactions is equal to summary
    Given Search bar is available
    When I type keyword "Fashion" into search bar
    And I click search button
    Then The sum of all transactions equals the summary value

  Scenario: Verify that the number of transactions matches the summary 
    Given Search bar is available
    When I type keyword "Fashion" into search bar
    And I click search button
    Then Number of transactions matches the summary 