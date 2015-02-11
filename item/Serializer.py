from item.models import Item
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        read_only_fields = ('owner', 'sell_price', 'source', 'status', 'tag')