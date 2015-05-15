from django.shortcuts import render
from item.Serializer import ItemSerializer
from item.models import Item
from rest_framework import generics


class ItemsList(generics.ListAPIView):
    model = Item
    serializer_class = ItemSerializer

    def get_queryset(self):
        theid = self.kwargs['pk']
        return Item.objects.filter(owner__pk=theid)


class SingleItem(generics.ListAPIView):
    model = Item
    serializer_class = ItemSerializer

    def get_queryset(self):
        itemid = self.kwargs['pk']
        return Item.objects.filter(item_id=itemid)

# Create your views here.


def repo_index(request, pk):
    return render(request, "item/myRepository.html")


def item_view(request, pk):
    return render(request, "item/oneItem.html")