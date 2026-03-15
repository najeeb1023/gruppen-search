import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { LandingPage } from "../pages/LandingPage";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);

let landingPage = new LandingPage(pageFixture.page);

Given("The user navigates to the URL", async function() {
    await landingPage.goToUrl();
});

When("User enters {string} in the search bar.", async function(city: string) {
    await landingPage.enterCity(city);
});

When("User clicks the search button.", async function() {
    await landingPage.executeSearch();
});

Then("User is returned with the search results.", async function() {
    await landingPage.searchResults();
});