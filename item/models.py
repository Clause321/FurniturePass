from django.db import models
import user

class Tag(models.Model):
    tag_name = models.CharField(unique=True, max_length=20, null=True)

    def __str__(self):
        return self.tag_name

class Category(models.Model):
    catagory_name = models.CharField(max_length=40, null=True)

    def __str__(self):
        return self.catagory_name

class Item(models.Model):
    item_name = models.CharField(max_length=40, null=True)
    owner = models.ForeignKey('user.MyUser', related_name='myItem', null=True)
    #buyer = models.ForeignKey('user.MyUser') <= cannot write like this because django cannot tell
    final_buyer = models.ForeignKey('user.MyUser', related_name='myBoughtItem', null=True, blank=True)
    item_id = models.AutoField(primary_key=True)
    sell_price = models.IntegerField(null=True, blank=True)
    sell_time = models.DateTimeField(null=True, blank=True)
    #source denotes where the item bought from
    source = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=30, null=True)
    expire_time = models.DateTimeField(null=True)
    tag = models.ManyToManyField(Tag, null=True)
    catagory = models.ManyToManyField(Category, null=True)
    description = models.TextField(null=True)

