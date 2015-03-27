from item.models import Item
from rest_framework import serializers
from rest_framework import pagination


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        read_only_fields = ('owner_name',
                            'item_name',
                            'description',
                            'sell_price',
                            'source',
                            'status',
                            'tag',
                            'expire_time')

