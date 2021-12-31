from django.shortcuts import render
from django.db.models import query
from rest_framework import serializers, viewsets, authentication, permissions
from rest_framework.response import Response
from .models import *
from .serializers import *
import json
import requests
from requests.structures import CaseInsensitiveDict
from rest_framework.decorators import api_view, authentication_classes, permission_classes




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

@api_view(['GET'])
def twitter_view(request):
    user = request.user
    positions_set = Position.objects.filter(user=user)
    keywords = []
    space = '%20'
    for asset in positions_set.iterator():
        keywords.append(asset.asset_id)

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer AAAAAAAAAAAAAAAAAAAAABzvWwEAAAAAdiwN%2BhdGMGjx11qvbyGC2QQW0iI%3DoOs2PWst8DJVfv7jNz3WwOWMXvb6qmtZYl2VfYyhJT0DyY281I"    

   
    url = f'https://api.twitter.com/2/tweets/search/recent?query={space.join(keywords)}%20(is%3Averified%20lang%3Aen%20-is%3Areply%20-is%3Aretweet%20-is%3Aquote%20-has%3Amentions%20-has%3Amedia%20-has%3Alinks)&expansions=author_id&tweet.fields=id,created_at,text,author_id&user.fields=id,name,username,verified,profile_image_url,url'
    
    response = requests.get(url, headers=headers)
    modified_response = response.json()
    tweet_list = modified_response
    

    return Response(tweet_list)
   