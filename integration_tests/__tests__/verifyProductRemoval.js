import ComparePageHelper from '../pages/compare.page.helper'
import ComparePage from '../pages/compare.page'
import { expect } from 'chai'
import StepLogger from '../step-logger'

const timeout = 5000
let page

describe(
  'Compare Products Page',
  () => {

    let stepLogger

    beforeAll(async () => {

      stepLogger = new StepLogger(true)

      stepLogger.stepId(1)
      stepLogger.step('Launch Compare Page App')
      page = await global.__BROWSER__.newPage()
      await page.goto('http://localhost:3000/')
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    it(`Verify that by clicking on Remove button removes only that product and its respective Price, Colors
        and Condition values from the comparision section. Verify that after removing product for comparision,
        it displays Copmare button on mouse over on that product tile`,
      async () => {

        await ComparePageHelper.waitForElementToBeClickable(page, ComparePage.chair, ComparePage.lamp, ComparePage.vase)

        stepLogger.stepId(2)
        stepLogger.step('Click on Compare buttons on product tile of Lamp, Statue and Vase')
        await page.click(ComparePage.lamp)
        await page.click(ComparePage.statue)
        await page.click(ComparePage.vase)

        stepLogger.stepId(3)
        stepLogger.step('Click on Remove button on product tile of Statue')
        stepLogger.verification('Remove button replaced by Compare button on product tile for Statue')
        await page.click(ComparePage.statue)

        stepLogger.verification('Remove button replaced by Compare button on product tile for Statue')
        var statueStatus = await ComparePageHelper.getTextOfElement(page, ComparePage.statue)
        expect(statueStatus).to.equal('COMPARE')

        stepLogger.stepId(4)
        stepLogger.verification('Verify comparision section')
        await ComparePageHelper.verifyProductsInComparisionTable(page, stepLogger)

        await ComparePageHelper.verifyProductsPriceInComparisionTable(page, stepLogger)

        await ComparePageHelper.verifyCountOfProductsColorsInComparisionTable(page, stepLogger)
        await ComparePageHelper.verifyCountOfProductsConditionInComparisionTable(page, stepLogger)

      })
  },
  timeout
)
