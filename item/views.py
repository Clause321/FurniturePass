from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from item.Serializer import ItemSerializer, CategorySerializer
from item.models import Item, Category, Tag
from rest_framework import generics
from item.formsTemplates import UploadForm
from user.models import Account
from item.util import datetime_format_helper


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
        return list(Item.objects.filter(item_id=itemid))

class CategoryAPIView(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer

    def get_queryset(self):
        category_id = self.kwargs['pk']
        print(Category.objects.filter(id=category_id))
        return Category.objects.filter(id=category_id)
# Create your views here.


def repo_index(request, pk):
    return render(request, "item/myRepository.html")


def item_view(request, pk):
    return render(request, "item/oneItem.html")

@login_required
def add_product(request):
    uploadForm = UploadForm()
    if request.method == "POST":
        me = Account.objects.get(pk=request.user.id)
        form = UploadForm(request.POST, request.FILES)
        #check existence
        try:
            item = Item.objects.get(item_name__iexact=request.POST.get("item_name"))
        except ObjectDoesNotExist:
            formated_time = datetime_format_helper(request.POST.get("expire_time"))
            item = Item(item_name=request.POST.get("item_name"),
                     owner=me,
                     sell_price=request.POST.get("sell_price"),
                     expire_time=formated_time,
                     description=request.POST.get("description"),
                     source=request.POST.get("source"),
                     image1=request.FILES['image1'],
                     image2=request.FILES['image2'],
                     image3=request.FILES['image3'])
            print(item.image1)
            print(item.image2)
            print(item.image3)
            item.save()

            print("success >>>this item hasn't existed before<<<")
            return redirect('/user/upload')
        print("error >>>item exists")
    return render(request, "item/upload.html", {'form': uploadForm})