import {Discount} from "./Discount"
import {Product} from "./Product"
import { ProductUnit } from './ProductUnit'
import {ReceiptItem} from "./ReceiptItem"
import * as _ from "lodash"

export class Receipt {
    private items: ReceiptItem[] = [];
    private discounts: Discount[] = [];

    public getTotalPrice(): number {
        let total = 0.0;
        for (let item of this.items) {
            total += item.totalPrice;
        }
        for ( let discount of this.discounts) {
            total -= discount.discountAmount;
        }
        return total;
    }

    public addProduct( p: Product, quantity: number, price: number, totalPrice: number): void {
        this.items.push(new ReceiptItem(p, quantity, price, totalPrice));
    }

    public getItems(): ReceiptItem[] {
        return _.clone(this.items);
    }

    public addDiscount( discount: Discount): void {
        this.discounts.push(discount);
    }

    public getDiscounts(): Discount[] {
        return this.discounts;
    }

    public print(column: number): string {
        const itemsPrintable = this.getItemsPrintable(this.getItems(), column)
        const discountPrintable = this.getDiscountsPrintable(this.getDiscounts(), column)
        const totalPrintable = this.getTotalPrintable(this.getTotalPrice(), column)

        return itemsPrintable + discountPrintable + "\n" + totalPrintable;
    }

    private getItemsPrintable (receiptItems: ReceiptItem[], columns: number): string {
        let productPrices = ""
        for (const item of receiptItems) {
            let price = this.format2Decimals(item.totalPrice)
            let quantity = this.presentQuantity(item)
            let name = item.product.name
            let unitPrice = this.format2Decimals(item.price)

            let whitespaceSize = columns - name.length - price.length
            let line = name + this.getWhitespace(whitespaceSize) + price + '\n'

            if (item.quantity != 1) {
                line += '  ' + unitPrice + ' * ' + quantity + '\n'
            }
            productPrices += line
        }
        return productPrices
    }

    private getDiscountsPrintable (receiptDiscounts: Discount[], columns: number): string {
        let discountsToPrint = ""
        for (const discount of receiptDiscounts) {
            let productPresentation = discount.product.name
            let pricePresentation = this.format2Decimals(discount.discountAmount)
            let description = discount.description
            discountsToPrint += description
            discountsToPrint += '('
            discountsToPrint += productPresentation
            discountsToPrint += ')'
            discountsToPrint += this.getWhitespace(columns - 3 - productPresentation.length - description.length - pricePresentation.length)
            discountsToPrint += '-'
            discountsToPrint += pricePresentation
            discountsToPrint += '\n'
        }
        return discountsToPrint
    }

    private getTotalPrintable (receiptTotal: number, columns: number): string {
        let totalToPrint = ''
        let pricePresentation = this.format2Decimals(receiptTotal)
        let total = 'Total: '
        let whitespace = this.getWhitespace(columns - total.length - pricePresentation.length)
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

    private presentQuantity( item: ReceiptItem): string  {
        return ProductUnit.Each == item.product.unit
            // TODO make sure this is the simplest way to make something similar to the java version
            ? new Intl.NumberFormat('en-UK', {maximumFractionDigits: 0}).format(item.quantity)
            : new Intl.NumberFormat('en-UK', {minimumFractionDigits: 3}).format(item.quantity);
    }

    private getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}
