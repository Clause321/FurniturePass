from item.models import Item, Category, Tag
from rest_framework import serializers
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        read_only_fields = ('owner',
                            'item_name',
                            'description',
                            'sell_price',
                            'source',
                            'status',
                            'tag',
                            'expire_time')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag