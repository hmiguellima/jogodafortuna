#import pprint
#pp = pprint.PrettyPrinter( indent = 4 )
# pp.pprint( data )

import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "../lib"))

import wallet
print dir( wallet )

amount      = 123
url_confirm = 'url_confirm'
url_cancel  = 'url_cancel'
items       = [ "a", "b", "c" ] 
morada      = wallet.Address( "pt", "Rua Visconde Valmor, 9", "Lisboa", "1800-100" )
print "%r" % morada
john        = wallet.Client( "john.doe@sapo.pt", morada )
print "%r" % john
compra      = wallet.Checkout( amount, items, john, url_confirm, url_cancel )
print "%r" % compra
