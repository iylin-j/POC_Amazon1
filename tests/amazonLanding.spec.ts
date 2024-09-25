import { test, expect } from '@playwright/test';
import AmazonHomePage from '../pom/amazon.page';

test('[15448] Validate if the user is able to land on to different tabs/categories', async ({ page }) => {
  const amazonHomePage = new AmazonHomePage(page);

  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveURL("https://www.amazon.in/");
  await amazonHomePage.validateShoppingContainer();
});

test('[15449] Validate if user is not able to login with invalid credentials ', async ({ page }) => {
  const amazonHomePage = new AmazonHomePage(page);

  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveURL("https://www.amazon.in/");
  await amazonHomePage.validateInvalidCredentials();
});

test('[15450] Validate if user is able to Create new Account', async ({ page }) => {
  const amazonHomePage = new AmazonHomePage(page);

  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveURL("https://www.amazon.in/");
  await amazonHomePage.validateSignUpPage();
});

test('Validate user is able to search "iphone 16", and list contains the products in search bar', async ({ page }) => {
  const amazonHomePage = new AmazonHomePage(page);

  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveURL("https://www.amazon.in/");
  await amazonHomePage.validateSearchBarDropDown();
});


