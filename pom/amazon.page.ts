import { expect, Locator, Page } from "@playwright/test";

export default class AmazonHomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateShoppingContainer(): Promise<void> {
        const urlCategories = ["minitv", "sell", "bestsellers", "deals", "mobile-phones", "amazonprime", "customer", "electronics"];

        for (let index = 1; index <= 8; index++) {
            var shoppingContainer = this.page.locator(`div#nav-xshop>a:nth-of-type(${index})`)
            await shoppingContainer.click();
            expect(this.page.url(), "Shopping category contains :" + urlCategories[index]).toContain(urlCategories[index - 1])
            await this.page.goBack();
        }
    }

    async validateSearchBarDropDown(): Promise<void> {
        
        var searchTextBox = this.page.locator("#twotabsearchtextbox");
        var searchBarDropDown = this.page.locator("div.two-pane-results-container .left-pane-results-container .s-suggestion-container .s-suggestion");
        await searchTextBox.fill("iphone 16");
        const count = searchBarDropDown.count();

        for (let index = 1; index <= await count; index++) {
            await expect(searchBarDropDown.locator(`nth=${index}`), `Drop down ${index} contains "iphone 16".`).toContainText("iphone 16");
        }
    }

    async validateInvalidCredentials(): Promise<void> {
        var helloSignInButton = this.page.locator("span#nav-link-accountList-nav-line-1");
        var emailMobileTextBox = this.page.locator("input[type='email']");
        var continueButton = this.page.locator("input.a-button-input");
        var errorMessage = this.page.locator("#auth-email-invalid-claim-alert .a-alert-container div.a-alert-content")

        await helloSignInButton.click();
        expect(this.page.url(), "User is in SignIn Page").toContain("https://www.amazon.in/ap/signin")
        await emailMobileTextBox.fill("iphone 16");
        await continueButton.click();
        await expect(errorMessage, `User has entered invalid credentials and error message is validated.`).toContainText("  Enter a valid email address or phone number");

    }
    

    async validateSignUpPage(){
        var helloSignInButton = this.page.locator("span#nav-link-accountList-nav-line-1");
        var createAccount = this.page.locator("#createAccountSubmit");
        var nameTextBox = this.page.locator("#ap_customer_name");
        var mobileTextBox = this.page.locator("#ap_phone_number");
        var passwordTextBox = this.page.locator("#ap_password");
        var continueButton = this.page.locator("#continue");
       
        await helloSignInButton.click();
        expect(this.page.url(), "User is in SignIn Page").toContain("https://www.amazon.in/ap/signin")        
        await createAccount.click();
        expect(this.page.url(), "User is in SignUp Page").toContain("https://www.amazon.in/ap/register?")

        await nameTextBox.fill("iphone 16");
        await mobileTextBox.fill("iphone 16");
        await passwordTextBox.fill("iphone 16");
        await continueButton.click();
        expect(this.page.url(), "User is in Created Account Page").toContain("https://www.amazon.in/ap/cvf/request?")
    }

    // async validateApplicationLanguages(){
    //     var languageButton = this.page.locator("a#icp-nav-flyout>span>span:nth-of-type(2)>div");
    //     var languagesRadioButton = this.page.locator("label > span > span>[dir='ltr']:nth-child(1)");
    //     var saveChangesButton = this.page.locator(".a-button-input")

    //     await languageButton.click();
    //     expect(this.page.url(), "User is in Customer Preferences Language Page").toContain("https://www.amazon.in/customer-preferences/edit?ie=UTF8&preferencesReturnUrl=%2F&ref_=topnav_lang")

    //     const count = await languagesRadioButton.count();
    //     console.log("COUNT",count);
    //     for (let index = 1; index <= count; index++) {
    //         await languagesRadioButton.locator(`nth=${index}`).click();
    //         await saveChangesButton.click();
    //         await this.page.goBack();
    //         await expect(languagesRadioButton.locator(`nth=${index}`), `User has selected as ${languagesRadioButton.locator(`nth=${index}`).textContent()} language`).toContainText(`${languagesRadioButton.locator(`nth=${index}`).textContent()}`);
    //     }
    // }

}