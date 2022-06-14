import faker from 'faker'
import { test } from '@playwright/test'
import $ from '../selectors/index'
import { Actions } from '../actions/actions'

const registrationEntityType = 'Person'
const registrationCountry = 'Lithuania'

const email = `${faker.name.firstName().toLowerCase()}${faker.datatype.number()}@example.com`
const password = `${faker.internet.password()}A1+`

test.describe('User - Registration', () => {
    test.beforeEach(async ({ page, request }) => {
        const I = new Actions(page, request)

        await I.visit('./login')
    })
    
    test(`Register as a "${registrationEntityType}" in ${registrationCountry}`, async ({ page, request }) => {
        const I = new Actions(page, request)

        await I.expectElementToContainText($.LOGIN.FORM.HEADER, 'Login to your account')

        await I.clickOn($.LOGIN.BTN.SIGN_UP)

        await I.expectElementToContainText($.REGISTRATION.FORM.HEADER, 'What type of account would you like to setup?')

        await I.clickOn($.REGISTRATION.BTN.AS_A_PERSON)

        await I.expectElementToContainText($.REGISTRATION.FORM.HEADER, 'What is your registration country?')

        await I.clickOn($.REGISTRATION.DROPDOWN.COUNTRY)

        await I.clickOnElementWithText($.DROPDOWN.LIST_ITEMS, registrationCountry)

        await I.expectElementToContainText($.DROPDOWN.SELECTED_VALUE, registrationCountry)

        await I.clickOn($.REGISTRATION.BTN.COUNTRY_CONTINUE)

        await I.expectElementToContainText($.REGISTRATION.FORM.HEADER, 'Create New Account')

        await I.clickOn($.REGISTRATION.BTN.REGISTER_WITH_EMAIL)

        await I.clickOn($.REGISTRATION.BTN.REGISTER)

        await I.assertNumberOfExplainMessages(3)

        await I.typeTextIntoElement(email, $.REGISTRATION.INPUT.EMAIL)

        await I.typeTextIntoElement(password, $.REGISTRATION.INPUT.PASSWORD)

        await I.typeTextIntoElement(password, $.REGISTRATION.INPUT.CONFIRM_PASSWORD)

        await I.clickOn($.REGISTRATION.CHECKBOX.UPDATES)

        await I.clickOn($.REGISTRATION.BTN.REGISTER)

        await I.expectElementToBeVisible($.MODAL.BODY)

        await I.expectElementToContainText($.MODAL.BODY, '')

        await I.clickOn($.REGISTRATION.BTN.GO_TO_SIGN_IN)

        await I.confirmEmailViaAPI(email)

        await I.expectElementToContainText($.LOGIN.FORM.HEADER, 'Login to your account')

        await I.clickOn($.LOGIN.BTN.LOGIN_WITH_EMAIL)

        await I.typeTextIntoElement(email, $.LOGIN.INPUT.EMAIL)

        await I.typeTextIntoElement(password, $.LOGIN.INPUT.PASSWORD)

        await I.clickOn($.LOGIN.CHECKBOX.REMEMBER_ME)

        await I.clickOn($.LOGIN.BTN.LOGIN_SUBMIT)

        await page.waitForSelector($.GENERAL.ACCOUNT_HEADER_MENU)
    })
})
