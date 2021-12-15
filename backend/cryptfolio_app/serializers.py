from collections import deque
from django.core import serializers
from .models import *
from rest_framework import serializers


class WatchlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'asset_id']


class SoldAssetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SoldAsset
        fields = ['id', 'user', 'position', 'asset_id', 'amount_sold', 'date_sold', 'price_sold']


class PositionSerializer(serializers.ModelSerializer):
    sold_assets = SoldAssetSerializer(many=True, read_only=True)

    class Meta:
        model = Position
        fields = ['id', 'user', 'asset_id', 'quantity', 'date_purchased', 'price_purchased', 'closed', 'sold_assets' ]


