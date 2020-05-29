import { ReceiptPrinter } from '../ReceiptPrinter'
import {Product} from "./Product"

export class Discount {

    constructor(public readonly product: Product,
                public readonly description: string,
                public readonly discountAmount: number) {
    }

    public print(columns): string {
        let discountsToPrint = ''

        let productPresentation = this.product.name
        let pricePresentation = ReceiptPrinter.format2Decimals(this.discountAmount)
        let description = this.description
        discountsToPrint += description
        discountsToPrint += '('
        discountsToPrint += productPresentation
        discountsToPrint += ')'
        discountsToPrint += ReceiptPrinter.getWhitespace(columns - 3 - productPresentation.length - description.length - pricePresentation.length)
        discountsToPrint += '-'
        discountsToPrint += pricePresentation
        discountsToPrint += '\n'

        return discountsToPrint
    }
}
