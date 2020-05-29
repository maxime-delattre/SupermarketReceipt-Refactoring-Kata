import {Product} from "../../src/model/Product"
import {ProductUnit} from "../../src/model/ProductUnit"
import {Receipt} from "../../src/model/Receipt"
import {Discount} from "../../src/model/Discount"
const approvals = require('approvals')

type Approvals = { verify: (a: string) => void }

describe('ReceiptPrinter', () => {

    approvals.mocha()

    let toothbrush: Product
    let apples: Product
    let receipt: Receipt

    beforeEach(function () {
        receipt = new Receipt()
        apples = new Product("apples", ProductUnit.Kilo)
        toothbrush = new Product("toothbrush", ProductUnit.Each)

    });


    it('oneLineItem', function (this: any) {
        receipt.addProduct(toothbrush, 1, 0.99, 0.99);
        this.verify(receipt.print(40));
    })


    it('quantityTwo', function (this: any) {
        receipt.addProduct(toothbrush, 2, 0.99, 0.99 * 2);
        this.verify(receipt.print(40));
    })


    it('looseWeight', function (this: any) {
        receipt.addProduct(apples, 2.3, 1.99, 1.99 * 2.3);
        this.verify(receipt.print(40));
    })


    it('total', function (this: any) {

        receipt.addProduct(toothbrush, 1, 0.99, 2 * 0.99);
        receipt.addProduct(apples, 0.75, 1.99, 1.99 * 0.75);
        this.verify(receipt.print(40));
    })


    it('discounts', function (this: any) {
        receipt.addDiscount(new Discount(apples, "3 for 2", 0.99));
        this.verify(receipt.print(40));
    })


    it('printWholeReceipt', function (this: any) {
        receipt.addProduct(toothbrush, 1, 0.99, 0.99);
        receipt.addProduct(toothbrush, 2, 0.99, 2 * 0.99);
        receipt.addProduct(apples, 0.75, 1.99, 1.99 * 0.75);
        receipt.addDiscount(new Discount(toothbrush, "3 for 2", 0.99));
        this.verify(receipt.print(40));
    })
});
