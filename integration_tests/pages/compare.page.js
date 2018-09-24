export class ComparePage {

  static get lamp() {
    return `img[src='lamp.jpg']+*+div`
  }

  static get chair() {
    return `img[src='chair.jpg']+*+div`
  }

  static get vase() {
    return `img[src='vase.jpg']+*+div`
  }

  static get statue() {
    return `img[src='statue.jpg']+*+div`
  }

  static get chairPriceOnTile() {
    return `img[src='chair.jpg']+*+*+div>div>span.product_price`
  }

  static get lampPriceOnTile() {
    return `img[src='lamp.jpg']+*+*+div>div>span.product_price`
  }

  static get statuePriceOnTile() {
    return `img[src='statue.jpg']+*+*+div>div>span.product_price`
  }

  static get vasePriceOnTile() {
    return `img[src='vase.jpg']+*+*+div>div>span.product_price`
  }

  static get productHeaderElements() {
    return `thead.thead-default tr > th`
  }

  static get pricesInComparisionTable() {
    return 'tr.price>td'
  }

  static get colorsInComparisionTable() {
    return 'tr.colors>td'
  }

  static get conditionsInComparisionTable() {
    return 'tr.condition>td'
  }
}

export default ComparePage