import { ReceiptPrinter } from '../src/ReceiptPrinter'
import {FakeCatalog} from "./FakeCatalog"
import {Product} from "../src/model/Product"
import {SupermarketCatalog} from "../src/model/SupermarketCatalog"
import {Receipt} from "../src/model/Receipt"
import {ShoppingCart} from "../src/model/ShoppingCart"
import {Teller} from "../src/model/Teller"
import {ProductUnit} from "../src/model/ProductUnit"
import { expect } from 'chai'
import {Discount} from "../src/model/Discount";
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

    it('for 2 differents items without any special offer, it prints the right receipt', function (this: any) {
        const toothbrush = new Product('toothbrush', ProductUnit.Each)
        const soap = new Product('soap', ProductUnit.Each)

        const receipt = new Receipt()
        receipt.addProduct(toothbrush, 1, 0.99, 0.99)
        receipt.addProduct(soap, 1, 3.99, 3.99)

        const receiptPrinter = new ReceiptPrinter()
        const printedReceipt = receiptPrinter.printReceipt(receipt)

        expect(printedReceipt).to.eq('toothbrush                          0.99\nsoap                                3.99\n\nTotal:                              4.98')
    });

    it('for 2 items without any special offer, it prints the right receipt', function (this: any) {
        const soap = new Product('soap', ProductUnit.Each)

        const receipt = new Receipt()
        receipt.addProduct(soap, 2, 3.99, 7.98)

        const receiptPrinter = new ReceiptPrinter()
        const printedReceipt = receiptPrinter.printReceipt(receipt)

        expect(printedReceipt).to.eq('soap                                7.98\n  3.99 * 2\n\nTotal:                              7.98')
    });

    it('for 1 item with special discount, it prints the right receipt', function(this: any) {
        const soap = new Product('soap', ProductUnit.Each)
        const discount = new Discount(soap, 'Special offer -10%', 0.40)

        const receipt = new Receipt()
        receipt.addProduct(soap, 1, 3.99, 3.99)
        receipt.addDiscount(discount)

        const receiptPrinter = new ReceiptPrinter()
        const printedReceipt = receiptPrinter.printReceipt(receipt)

        expect(printedReceipt).to.eq('soap                                3.99\nSpecial offer -10%(soap)           -0.40\n\nTotal:                              3.59')

    })

});
