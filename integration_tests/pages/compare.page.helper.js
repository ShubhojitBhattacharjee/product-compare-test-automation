import ComparePage from './compare.page'
import { expect } from 'chai'

export class ComparePageHelper {

  static async getTextOfElement(page, selector) {
    return await page.$eval(selector, function(elem) {
      return elem.innerText
    })
  }

  static async waitForElementToBeClickable(page, ...args) {

    for (var i = 1; i < arguments.length; i++) {
      await page.waitForSelector(arguments[i])
    }
  }

  static async checkProductExistsInComparisionTable(page, product) {

    var productHeaders = await page.$$(ComparePage.productHeaderElements)

    for (var i = 1; i < productHeaders.length; i++) {
      if (product.localeCompare(await page.evaluate(el => el.textContent, productHeaders[i])) === 0) {
        return true
      }
    }
    return false
  }

  static async checkPriceExistsInComparisionTable(page, priceParam) {

    var prices = await page.$$(ComparePage.pricesInComparisionTable)

    for (var price of prices) {
      if (priceParam.localeCompare(await page.evaluate(el => el.textContent, price)) === 0) {
        return true
      }
    }
    return false
  }

  static async getProductPriceFromComparisionTable(page, product) {

    var productHeaders = await page.$$(ComparePage.productHeaderElements)

    var productNames = []
    for (var i = 1; i < productHeaders.length; i++) {
      productNames.push(await page.evaluate(el => el.textContent, productHeaders[i]))
    }

    var prices = await page.$$(ComparePage.pricesInComparisionTable)
    var priceValues = []

    for (var price of prices) {
      priceValues.push(await page.evaluate(el => el.textContent, price))
    }

    var productPriceTable = new Map()
    for (var i = 0; i < productNames.length; i++) {
      productPriceTable.set(productNames[i], priceValues[i])
    }
    return productPriceTable.get(product)
  }

  static async checkProductColorsExistsInComparisionTable(page) {
    var colors = await page.$$(ComparePage.colorsInComparisionTable)

    let countOfColorsOfAllProducts = 0
    while (countOfColorsOfAllProducts < colors.length) {
      countOfColorsOfAllProducts++
    }
    return countOfColorsOfAllProducts
  }

  static async checkProductConditionExistsInComparisionTable(page) {
    var conditions = await page.$$(ComparePage.conditionsInComparisionTable)

    let countOfConditionOfAllProducts = 0
    while (countOfConditionOfAllProducts < conditions.length) {
      countOfConditionOfAllProducts++
    }
    return countOfConditionOfAllProducts
  }

  static async verifyProductsInComparisionTable(page, stepLogger) {
    var checkLampExistsInComparisionTable = await ComparePageHelper.checkProductExistsInComparisionTable(page, 'Lamp')
    var checkStatueExistsInComparisionTable = await ComparePageHelper.checkProductExistsInComparisionTable(page, 'Statue')
    var checkVaseExistsInComparisionTable = await ComparePageHelper.checkProductExistsInComparisionTable(page, 'Vase')

    stepLogger.subVerification('Verify only Product Statue is not displayed in comparision section')
    expect(checkLampExistsInComparisionTable).to.equal(true)
    expect(checkStatueExistsInComparisionTable).to.equal(false)
    expect(checkVaseExistsInComparisionTable).to.equal(true)
  }

  static async verifyProductsPriceInComparisionTable(page, stepLogger) {
    var lampPriceExistsInComparisionTable = await ComparePageHelper.checkPriceExistsInComparisionTable(page,
      await ComparePageHelper.getTextOfElement(page, ComparePage.lampPriceOnTile))
    var statuePriceExistsInComparisionTable = await ComparePageHelper.checkPriceExistsInComparisionTable(page,
      await ComparePageHelper.getTextOfElement(page, ComparePage.statuePriceOnTile))
    var vasePriceExistsInComparisionTable = await ComparePageHelper.checkPriceExistsInComparisionTable(page,
      await ComparePageHelper.getTextOfElement(page, ComparePage.vasePriceOnTile))

    stepLogger.subVerification('Verify only Statue price is not displayed in comparision table')
    expect(lampPriceExistsInComparisionTable).to.equal(true)
    expect(statuePriceExistsInComparisionTable).to.equal(false)
    expect(vasePriceExistsInComparisionTable).to.equal(true)
  }

  static async verifyCountOfProductsColorsInComparisionTable(page, stepLogger) {
    var numberOfProductsWithColors = await ComparePageHelper.checkProductConditionExistsInComparisionTable(page)

    stepLogger.subVerification('Verify colors of only 2 products are displayed in comparision table')
    expect(numberOfProductsWithColors).to.equal(2)
  }

  static async verifyCountOfProductsConditionInComparisionTable(page, stepLogger) {
    var numberOfProductsWithConditions = await ComparePageHelper.checkProductColorsExistsInComparisionTable(page)

    stepLogger.subVerification('Verify condition of only 2 products are displayed in comparision table')
    expect(numberOfProductsWithConditions).to.equal(2)
  }
}

export default ComparePageHelper
