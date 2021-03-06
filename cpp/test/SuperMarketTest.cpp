

#include "Catch.hpp"
#include "ApprovalTests.hpp"

#include "../model/SupermarketCatalog.h"
#include "FakeCatalog.h"
#include "../model/ShoppingCart.h"
#include "../model/Teller.h"

TEST_CASE("Discounts", "[Supermarket]")
{
    SupermarketCatalog *catalog = new FakeCatalog();
    Product toothbrush("toothbrush", ProductUnit::Each);
    catalog->addProduct(toothbrush, 0.99);
    Product apples("apples", ProductUnit::Kilo);
    catalog->addProduct(apples, 1.99);
    Teller teller(catalog);
    teller.addSpecialOffer(SpecialOfferType::TenPercentDiscount, toothbrush, 10.0);

    ShoppingCart cart;
    cart.addItemQuantity(apples, 2.5);

    Receipt receipt = teller.checksOutArticlesFrom(cart);

    REQUIRE(4.975 == receipt.getTotalPrice());
    REQUIRE(receipt.getDiscounts().empty());
    REQUIRE(1 == receipt.getItems().size());
    ReceiptItem receiptItem = receipt.getItems()[0];
    REQUIRE(apples == receiptItem.getProduct());
    REQUIRE(1.99 == receiptItem.getPrice());
    REQUIRE(2.5 * 1.99 == receiptItem.getTotalPrice());
    REQUIRE(2.5 == receiptItem.getQuantity());

}



