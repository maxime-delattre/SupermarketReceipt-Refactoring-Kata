import {ProductUnit} from "./model/ProductUnit"
import {ReceiptItem} from "./model/ReceiptItem"
import {Receipt} from "./model/Receipt"
import {Discount} from "./model/Discount";

export class ReceiptPrinter {

    public constructor(private readonly columns: number = 40) {
    }

    public printReceipt(receipt: Receipt): string {
        const itemsPrintable = this.getItemsPrintable(receipt.getItems())
        const discountPrintable = this.getDiscountsPrintable(receipt.getDiscounts())
        const totalPrintable = this.getTotalPrintable(receipt.getTotalPrice())

        return itemsPrintable + discountPrintable + "\n" + totalPrintable;
    }

    private getItemsPrintable (receiptItems: ReceiptItem[]): string {
        let productPrices = ""
        for (const item of receiptItems) {
            let price = this.format2Decimals(item.totalPrice)
            let quantity = ReceiptPrinter.presentQuantity(item)
            let name = item.product.name
            let unitPrice = this.format2Decimals(item.price)

            let whitespaceSize = this.columns - name.length - price.length
            let line = name + ReceiptPrinter.getWhitespace(whitespaceSize) + price + '\n'

            if (item.quantity != 1) {
                line += '  ' + unitPrice + ' * ' + quantity + '\n'
            }
            productPrices += line
        }
        return productPrices
    }

    private getDiscountsPrintable (receiptDiscounts: Discount[]): string {
        let discountsToPrint = ""
        for (const discount of receiptDiscounts) {
            let productPresentation = discount.product.name
            let pricePresentation = this.format2Decimals(discount.discountAmount)
            let description = discount.description
            discountsToPrint += description
            discountsToPrint += '('
            discountsToPrint += productPresentation
            discountsToPrint += ')'
            discountsToPrint += ReceiptPrinter.getWhitespace(this.columns - 3 - productPresentation.length - description.length - pricePresentation.length)
            discountsToPrint += '-'
            discountsToPrint += pricePresentation
            discountsToPrint += '\n'
        }
        return discountsToPrint
    }

    private getTotalPrintable (receiptTotal: number): string {
        let totalToPrint = ''
        let pricePresentation = this.format2Decimals(receiptTotal)
        let total = 'Total: '
        let whitespace = ReceiptPrinter.getWhitespace(this.columns - total.length - pricePresentation.length)
        totalToPrint += total
        totalToPrint += whitespace
        totalToPrint += pricePresentation
        return totalToPrint
    }

    private format2Decimals(number: number) {
        return new Intl.NumberFormat('en-UK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number)
    }

    private static presentQuantity( item: ReceiptItem): string  {
        return ProductUnit.Each == item.product.unit
            // TODO make sure this is the simplest way to make something similar to the java version
                ? new Intl.NumberFormat('en-UK', {maximumFractionDigits: 0}).format(item.quantity)
                : new Intl.NumberFormat('en-UK', {minimumFractionDigits: 3}).format(item.quantity);
    }

    private static getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}
