from django.db import models
from item.util import upload_helper
import user

class Tag(models.Model):
    tag_name = models.CharField(unique=True, max_length=20, null=True)

    def __str__(self):
        return self.tag_name

class Category(models.Model):
    category_name = models.CharField(max_length=40, null=True)

    def __str__(self):
        return self.category_name

class Item(models.Model):
    item_name = models.CharField(max_length=40, null=True, unique=True)
    owner = models.ForeignKey('user.Account', related_name='myItem', null=True)
    final_buyer = models.ForeignKey('user.Account', related_name='myBoughtItem', null=True, blank=True)
    item_id = models.AutoField(primary_key=True)
    sell_price = models.IntegerField(null=False, blank=False)
    sell_time = models.DateTimeField(null=True, blank=True)
    source = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=30, null=True, blank=True, default="on sale")
    expire_time = models.DateTimeField()
    tag = models.ManyToManyField(Tag, blank=True)
    category = models.ManyToManyField(Category, blank=True)
    description = models.TextField(null=True)
    """
    image1 = models.ImageField(upload_to=upload_helper_function('photo'), null=True, blank=True)
    image2 = models.ImageField(upload_to=upload_helper_function('photo'), null=True, blank=True)
    image3 = models.ImageField(upload_to=upload_helper_function('photo'), null=True, blank=True)
    """
    image1 = models.ImageField(upload_to=upload_helper, null=True, blank=True)
    image2 = models.ImageField(upload_to=upload_helper, null=True, blank=True)
    image3 = models.ImageField(upload_to=upload_helper, null=True, blank=True)


