import {Discount} from "./Discount"
import {Product} from "./Product"
import { ProductUnit } from './ProductUnit'
import {ReceiptItem} from "./ReceiptItem"
import * as _ from "lodash"
import {ReceiptPrinter} from "../ReceiptPrinter";

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
        const itemsPrintable = this.getItemsPrintable(column)
        const discountPrintable = this.getDiscountsPrintable(column)
        const totalPrintable = this.getTotalPrintable(this.getTotalPrice(), column)

        return itemsPrintable + discountPrintable + "\n" + totalPrintable;
    }

    private getItemsPrintable (columns: number): string {
        return this.items.map(item => item.print(columns)).join("");
    }

    private getDiscountsPrintable (columns: number): string {
        let discountsToPrint = ""
        for (const discount of this.discounts) {
            let productPresentation = discount.product.name
            let pricePresentation = ReceiptPrinter.format2Decimals(discount.discountAmount)
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
        let pricePresentation = ReceiptPrinter.format2Decimals(receiptTotal)
        let total = 'Total: '
        let whitespace = this.getWhitespace(columns - total.length - pricePresentation.length)
        totalToPrint += total
        totalToPrint += whitespace
        totalToPrint += pricePresentation
        return totalToPrint
    }

    private getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}
