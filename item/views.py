from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.renderers import JSONRenderer
from item.serializer import ItemSerializer, CategorySerializer, TagSerializer
from item.models import Item, Category, Tag
from rest_framework import generics
from item.formsTemplates import UploadForm
from user.models import Account
from item.util import datetime_format_helper
from django.db.models import Q

def display(categories):
    display_list = {}

    for category in categories:
        children = category.children.all()
        if len(children) > 0:
            display_list[category.category_name] = (display(children))
        elif len(children) == 0:
            display_list[category.category_name] = {}
    return display_list


class testList(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer

    def get_queryset(self):
        input = display(Category.objects.filter(parent=None))
        print(input)
        json = JSONRenderer().render(input)
        return [{'email': 'hotdog@umich.edu'}]



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


class CategoryView(generics.ListAPIView):
    model = Category
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class TagView(generics.ListAPIView):
    model = Tag
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()
# Create your views here.

def search_test(request):
    print(request.GET['q'])
    return HttpResponse("success")


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