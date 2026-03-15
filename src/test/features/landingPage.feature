Feature: User navigates to search a group.

    User searches for a therapie group via City.

    Background: User is landed on the webpage.
        Given The user navigates to the URL
    
    Scenario: User is able to search a group via City.
       When User enters "<City>" in the search bar.
       And User clicks the search button.
       Then User is returned with the search results.

       Examples:
           | City         |
           | Essen, Ruhr  |
           | Magdeburg    |
