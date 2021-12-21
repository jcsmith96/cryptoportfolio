from django.db import models
from django.contrib.auth.models import User

class Position(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='positions')
    asset_id = models.CharField(max_length=20)
    quantity = models.DecimalField(max_digits=16, decimal_places=9)
    date_purchased = models.DateField(auto_now=False, auto_now_add=False)
    price_purchased = models.DecimalField(max_digits=16, decimal_places=2)
    closed = models.BooleanField()

    def __str__(self):
        return f"ASSET: {self.asset_id} QUANTITY: {self.quantity} PRICE: {self.price_purchased} "

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
    asset_id = models.CharField(max_length=20)


    def __str__(self):
        return f"{self.asset_id}"


class SoldAsset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sold_assets')
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='positions')
    asset_id = models.CharField(max_length=20)
    amount_sold = models.DecimalField(max_digits=16, decimal_places=9) 
    date_sold = models.DateField(auto_now=False, auto_now_add=False)
    price_sold = models.DecimalField(max_digits=16, decimal_places=2)
   
    def __str__(self):
       return f"TXID: {self.id}| {self.amount_sold}| {self.asset_id} SOLD"