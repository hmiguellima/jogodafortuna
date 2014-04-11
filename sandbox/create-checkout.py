#!/usr/bin/python

WALLET_ENDPOINT='https://services.wallet.codebits.eu/api/v2'
KEY='b5f6557269cfe8659e34aa72b675c5ea4d7481ab'
AMOUNT=1
URL_CONFIRM='https://jogodafortuna/shop/confirm'
URL_CANCEL='https://jogodafortuna/shop/cancel'
QUANT=1

COMMAND="""
curl %s/checkout \
-H "Content-Type: application/json" \
-H "Authorization: WalletPT %s" \
-d '{"payment":{ "client": {
                "name": "some name", 
                "email": "foo@bar.com", 
                "address": {
                        "country": "pt", 
                        "address":"some street", 
                        "city": "lisboa", 
                        "postalcode": "1100-000"
                }
                },
                "amount":%d,
                "currency": "EUR",
                "items":[{
                        "ref":123,
                        "name":"Livro",
                        "descr":"Um livro",
                        "qt":1
                        }]
                },
    "url_confirm":"%s",
    "url_cancel":"%s"}'
""" % ( WALLET_ENDPOINT, KEY, QUANT, URL_CONFIRM, URL_CANCEL)

print COMMAND
