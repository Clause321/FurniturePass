from django.shortcuts import render
from item.Serializer import ItemSerializer
from item.models import Item
from rest_framework import generics

class ItemsList(generics.ListAPIView):
    model = Item
    serializer_class = ItemSerializer

    def get_queryset(self):
        theid = self.kwargs['pk']
        print(theid)
        return Item.objects.filter(owner__pk=theid)
# Create your views here.

def repo_index(request):
    return render(request, "myRepository.html")