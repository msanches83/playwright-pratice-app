import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) //increases the timeout from the suite in 2000ms
})

test('Auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()

    //const text = await successButton.textContent()
    //await successButton.waitFor({state: "attached"})

    //const text = await successButton.textContent()
    //expect(text).toContain('Data loaded with AJAX get request.')

    // await new Promise(r => setTimeout(r, 2000));

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    //await page.waitForSelector('.bg-success')

    // ___ wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___ wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async({page}) => {
    //test.setTimeout(10000)
    test.slow() //multiplies by 3 the test timeout
    const successButton = page.locator('.bg-success')
    await successButton.click()
})