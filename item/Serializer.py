from item.models import Item, Category, Tag
from user.serializer import AccountSerializer
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    owner = AccountSerializer()
    class Meta:
        model = Item
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag