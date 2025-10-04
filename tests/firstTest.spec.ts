import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


    test('Locator syntax rules', async ({page}) => {
        //by Tag name
        await page.locator('input').first().click()
        
        //by ID
        await page.locator('#inputEmail1').click()

        //by Class value
        page.locator('.shape-rectangle')

        //by Atributte
        page.locator('[placeholder="Email"]')

        //by Class value (full)
        page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //Combine different selectors
        page.locator('input[placeholder="Email"][nbinput]')

        //by Xpath NOT RECOMMENDED
        page.locator('//*[@id="inputEmail1"]')

        //by partial text match
        page.locator(':text("Using")')

        //by exact text
        page.locator(':text-is("Using the grid")')
    })

    test('User facing locators', async({page}) => {
        //by Roles
        await page.getByRole('textbox', {name: "Email"}).first().click()
        await page.getByRole('button', {name: "Sign in"}).first().click()

        //by Label
        await page.getByLabel('Email').first().click()

        //by Placeholder
        await page.getByPlaceholder('Jane Doe').click()

        //by Text
        await page.getByText('Using the Grid').click()

        //by Title
        //await page.getByTitle('IoT Dashboard').click()

        //by TestID
        await page.getByTestId('SignIn').click()
    })

    test('Locating child elements', async({page}) => {
        //by Tag
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

        //by Role
        await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

        //by Index
        await page.locator('nb-card').nth(3).getByRole('button').click()
    })

    test('Locating parents elements', async({page}) => {
        //by Text
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()

        //by ID
        await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

        //by Filter independent method
        await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

        //by 2 filters
        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: "Email"}).click()

        //by xpath
        await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
    })

    test('Reusing locators', async({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const emailField = basicForm.getByRole('textbox', {name: "Email"})

        await emailField.fill('test@test.com')
        await basicForm.getByRole('textbox', {name: "Password"}).fill('Wolcome123')
        await basicForm.locator('nb-checkbox').click()
        await basicForm.getByRole('button').click()

        await expect(emailField).toHaveValue('test@test.com')
    })

    test('Extracting values', async({page}) => {  
        //Single test value
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const buttonText = await basicForm.locator('button').textContent()
        expect(buttonText).toEqual('Submit')

        //All text values
        const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
        expect(allRadioButtonsLabels).toContain("Option 1")

        //Input value
        const emailField = basicForm.getByRole('textbox', {name: 'Email'})
        await emailField.fill('test@test.com')
        const emailValue = await emailField.inputValue()
        expect(emailValue).toEqual('test@test.com')

        //Attribute value
        const placeholderValue = await emailField.getAttribute('placeholder')
        expect(placeholderValue).toEqual('Email')

    })

    test('Assertions', async({page}) => {  
        const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
        
        //General asserions
        const value = 5
        expect(value).toEqual(5)

        const text = await basicFormButton.textContent()
        expect(text).toEqual("Submit")

        //Locator assertion
        await expect(basicFormButton).toHaveText('Submit')

        //Soft Assertion
        await expect.soft(basicFormButton).toHaveText('Submit')
        await basicFormButton.click()
    })


/*   test('Reusing locators', async({page}) => {  

    }) */

/* test.describe('suite 1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test('the fisrt test', async ({page}) => {
        await page.getByText('Form Layouts').click()    
    })

    test('navigate to datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })

}) */