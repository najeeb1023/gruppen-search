import { expect, Page } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { PageElement } from "../resources/interfaces/iPageElement";
import * as landingPageLocators from "../resources/landingPageLocators/landingPageLocators.json";

function getResource(resourceName: string){
    return landingPageLocators.webElements.find((element: PageElement) =>
        element.elementName == resourceName) as PageElement;
}

export class LandingPage {

    public selectedCity!: string;
  
    constructor ( public page: Page){
        pageFixture.page = page;
    };

    landingPageLocators = {
        gruppenSuchenSearchBox:() => pageFixture.page.locator(getResource('gruppenSuchenSearchBox').selectorValue),
        gruppenSuchenBtn:() => pageFixture.page.locator(getResource('gruppenSuchenBtn').selectorValue),
        practionerName:() => pageFixture.page.locator(getResource('practionerName').selectorValue),
        
        resultItems:() => pageFixture.page.locator(getResource('resultItems').selectorValue)
    };

    public async goToUrl():Promise<void>{
        await pageFixture.page.goto("https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/");    
    };

    public async enterCity(city: string):Promise<void>{
        this.selectedCity = city;
        await this.landingPageLocators.gruppenSuchenSearchBox().fill(city);
        await pageFixture.page.keyboard.press("PageDown");
    };

    public async executeSearch():Promise<void>{
        await this.landingPageLocators.gruppenSuchenBtn().click();
    };

    public async searchResults(): Promise<void> {
    const map = pageFixture.page.locator("#b4-b1-b18-b6-MapContainer");
    await map.hover();
    await pageFixture.page.mouse.wheel(0, 50);
    const results = await pageFixture.page.locator(getResource('resultItems').selectorValue).all();
    console.log(`\nTherapie places in 🗺️  \x1b[1m\x1b[32m${this.selectedCity}\x1b[0m:`);
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const practitionerName = await result.locator(".bold.OSFillParent").textContent();
        const address = await result.locator("span.OSFillParent").nth(1).textContent();
        const groups = await result.locator(".info-container div").first().textContent();
        const freePlaces = await result.locator(".info-container div").nth(1).textContent();
        console.log(`\n${i + 1}. ${practitionerName}`);
        console.log(`   Address: ${address}`);
        console.log(`   Groups: ${groups}`);
        console.log(`   Free places: ${freePlaces}`);
        await expect(this.landingPageLocators.resultItems().first()).toBeVisible({timeout: 5000});
    };
    };
};