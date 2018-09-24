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

    it(`Verify that addition of atleast two products for comparision displays the exact same value of price
        in comparision section as displayed in the product tile for the respective products along with some
        value for Colors and Condition. Verify Compare button changed to Remove button for these products`,
      async () => {

        await ComparePageHelper.waitForElementToBeClickable(page, ComparePage.chair, ComparePage.lamp, ComparePage.vase)

        stepLogger.stepId(2)
        stepLogger.step('Click on Compare buttons on product tile of Chair, Lamp and Vase')
        await page.click(ComparePage.chair)
        await page.click(ComparePage.lamp)
        await page.click(ComparePage.vase)

        let chairStatus = await ComparePageHelper.getTextOfElement(page, ComparePage.chair)
        let lampStatus = await ComparePageHelper.getTextOfElement(page, ComparePage.lamp)
        let statueStatus = await ComparePageHelper.getTextOfElement(page, ComparePage.statue)
        let vaseStatus = await ComparePageHelper.getTextOfElement(page, ComparePage.vase)

        stepLogger.verification('Verify compare button replaced by Remove button in product tile for Chair, Lamp and Vase only')
        expect(chairStatus).to.equal('REMOVE')
        expect(lampStatus).to.equal('REMOVE')
        expect(statueStatus).to.equal('COMPARE')
        expect(vaseStatus).to.equal('REMOVE')

        var chairPriceInComparisionTable = await ComparePageHelper.getProductPriceFromComparisionTable(page, 'Chair')
        var lampPriceInComparisionTable = await ComparePageHelper.getProductPriceFromComparisionTable(page, 'Lamp')
        var vasePriceInComparisionTable = await ComparePageHelper.getProductPriceFromComparisionTable(page, 'Vase')

        var chairPriceOnTile = await ComparePageHelper.getTextOfElement(page, ComparePage.chairPriceOnTile)
        var lampPriceOnTile = await ComparePageHelper.getTextOfElement(page, ComparePage.lampPriceOnTile)
        var vasePriceOnTile = await ComparePageHelper.getTextOfElement(page, ComparePage.vasePriceOnTile)

        stepLogger.stepId(3)
        stepLogger.step('Verify Price of Chair, Lamp and Vase in comparision section')
        expect(chairPriceOnTile).to.equal(chairPriceInComparisionTable)
        expect(lampPriceOnTile).to.equal(lampPriceInComparisionTable)
        expect(vasePriceOnTile).to.equal(vasePriceInComparisionTable)

        var numberOfProductsWithColors = await ComparePageHelper.checkProductConditionExistsInComparisionTable(page)
        var numberOfProductsWithConditions = await ComparePageHelper.checkProductColorsExistsInComparisionTable(page)

        stepLogger.stepId(4)
        stepLogger.step('Verify Colors and Condition of Chair, Lamp and Vase in comparision section')
        expect(numberOfProductsWithColors).to.equal(3)
        expect(numberOfProductsWithConditions).to.equal(3)
      })
  },
  timeout
)
