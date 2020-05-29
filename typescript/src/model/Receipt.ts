import {Discount} from "./Discount"
import {Product} from "./Product"
import {ReceiptItem} from "./ReceiptItem"
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

    public addDiscount( discount: Discount): void {
        this.discounts.push(discount);
    }

    public getDiscounts(): Discount[] {
        return this.discounts;
    }

    public print(column: number): string {
        const itemsPrintable = this.getItemsPrintable(column)
        const discountPrintable = this.getDiscountsPrintable(column)
        const totalPrintable = this.getTotalPrintable(column)

        return itemsPrintable + discountPrintable + "\n" + totalPrintable;
    }

    private getItemsPrintable (columns: number): string {
        return this.items
            .map(item => item.print(columns))
            .join("");
    }

    private getDiscountsPrintable (columns: number): string {
        return this.discounts
            .map(item => item.print(columns))
            .join("");
    }

    private getTotalPrintable (columns: number): string {
        let pricePresentation = ReceiptPrinter.format2Decimals(this.getTotalPrice())
        let total = 'Total: '
        let whitespace = ReceiptPrinter.getWhitespace(columns - total.length - pricePresentation.length)
        return total + whitespace + pricePresentation
    }
}
