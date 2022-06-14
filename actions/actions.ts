import { APIRequestContext, expect, Page } from '@playwright/test'

export class Actions {
  readonly page: Page
  readonly request: APIRequestContext

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.request = request
  }

  async visit (url: string) {
    await this.page.goto(url)
  }

  async clickOn (selector: string) {
    await this.page.click(selector)
  }

  async expectElementToContainText (selector: string, text: string) {
    await expect( this.page.locator(selector) ).toContainText(text)
  }

  async clickOnElementWithText (selector: string, text: string) {
    await this.page.locator(`${selector} >> text=${text}`).click()
  }

  async typeTextIntoElement (text: string, selector: string) {
    await this.page.locator(selector).type(text)
  }

  async confirmEmailViaAPI (email: string) {
    const response = await this.request.post('/account/tests/confirm-user-email', {
      data: {
        email
      }
    })

    expect(response.ok()).toBeTruthy()
  }

  async assertNumberOfExplainMessages (number: number) {
    const explainMessages = await this.page.$$('.ant-form-explain')
    expect( explainMessages.length ).toBe(number)
  }

  async expectElementToBeVisible (selector: string) {
    expect( this.page.locator(selector) ).toBeVisible()
  }

  async expectElementToNotBeVisible (selector: string) {
    expect( this.page.locator(selector) ).toBeHidden()
  }
}
