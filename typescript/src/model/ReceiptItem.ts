import {Product} from "./Product"
import {ReceiptPrinter} from "../ReceiptPrinter";
import {ProductUnit} from "./ProductUnit";

export class ReceiptItem {

    public constructor(public readonly product: Product,
                       public readonly quantity: number,
                       public readonly price: number,
                       public totalPrice: number) {
    }

    print(columns: number): string {
        let price = ReceiptPrinter.format2Decimals(this.totalPrice)
        let quantity = this.presentQuantity()
        let name = this.product.name
        let unitPrice = ReceiptPrinter.format2Decimals(this.price)

        let whitespaceSize = columns - name.length - price.length
        let line = name + ReceiptPrinter.getWhitespace(whitespaceSize) + price + '\n'

        if (this.quantity != 1) {
            line += '  ' + unitPrice + ' * ' + quantity + '\n'
        }
        return line;
    }

    private presentQuantity(): string  {
        return ProductUnit.Each == this.product.unit
          // TODO make sure this is the simplest way to make something similar to the java version
          ? new Intl.NumberFormat('en-UK', {maximumFractionDigits: 0}).format(this.quantity)
          : new Intl.NumberFormat('en-UK', {minimumFractionDigits: 3}).format(this.quantity);
    }
}
