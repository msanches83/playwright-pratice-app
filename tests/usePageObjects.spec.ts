import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from "@faker-js/faker"


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('Navigate to Form Page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommomDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})