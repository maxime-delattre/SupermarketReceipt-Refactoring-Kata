import {ProductUnit} from "./model/ProductUnit"
import {ReceiptItem} from "./model/ReceiptItem"
import {Receipt} from "./model/Receipt"
import {Discount} from "./model/Discount";

export class ReceiptPrinter {

    public constructor(private readonly columns: number = 40) {
    }

    public printReceipt(receipt: Receipt): string {
        return receipt.print(this.columns)
    }

}
