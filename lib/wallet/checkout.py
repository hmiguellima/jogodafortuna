class Checkout:
    def __init__(self, amount, items, client, urlconfirm,urlcancel ):
        self.amount = amount
        self.items = items
        self.client = client
        self.urlconfirm = urlconfirm
        self.urlcancel = urlcancel
