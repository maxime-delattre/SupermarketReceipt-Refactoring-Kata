import {Receipt} from "./model/Receipt"

export class ReceiptPrinter {

    public constructor(private readonly columns: number = 40) {
    }

    public printReceipt(receipt: Receipt): string {
        return receipt.print(this.columns)
    }

    static format2Decimals(number: number) {
        return new Intl.NumberFormat('en-UK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number)
    }

    static getWhitespace(whitespaceSize: number): string {
        return " ".repeat(whitespaceSize);
    }
}
