import { ReceiptPrinter } from '../src/ReceiptPrinter'
import {FakeCatalog} from "./FakeCatalog"
import {Product} from "../src/model/Product"
import {SupermarketCatalog} from "../src/model/SupermarketCatalog"
import {Receipt} from "../src/model/Receipt"
import {ShoppingCart} from "../src/model/ShoppingCart"
import {Teller} from "../src/model/Teller"
import {ProductUnit} from "../src/model/ProductUnit"
import { expect } from 'chai'
const approvals = require('approvals')

type Approvals = {
    verify: (s: string) => void
    verifyAsJSON: (o: Object) => void
}
describe('Supermarket', function () {

    approvals.mocha()
    it('for 1 item without any special offer, it prints the right receipt', function (this: any) {
        const toothbrush = new Product('toothbrush', ProductUnit.Each)

        const receipt = new Receipt()
        receipt.addProduct(toothbrush, 1, 0.99, 0.99)

        const receiptPrinter = new ReceiptPrinter()
        const printedReceipt = receiptPrinter.printReceipt(receipt)

        expect(printedReceipt).to.eq('toothbrush                          0.99\n\nTotal:                              0.99')
    });

});
