from django.shortcuts import render
from django.db.models import query
from rest_framework import serializers, viewsets
from .models import *
from .serializers import *


class WatchlistViewSet(viewsets.ModelViewSet):

    serializer_class = WatchlistSerializer

    def get_queryset(self):

        user = self.request.user
        return Watchlist.objects.filter(user=user)


class SoldAssetViewSet(viewsets.ModelViewSet):

    serializer_class = SoldAssetSerializer

    def get_queryset(self):

        user = self.request.user
        return SoldAsset.objects.filter(user=user)

class PositionViewSet(viewsets.ModelViewSet):

    serializer_class = PositionSerializer

    def get_queryset(self):

        user = self.request.user
        return Position.objects.filter(user=user)


