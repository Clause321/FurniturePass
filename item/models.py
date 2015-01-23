from django.db import models
from user.models import MyUser

class Item(models.Model):
    owner = models.ForeignKey(MyUser)
    item_id = models.AutoField(primary_key=True, default=0)
    self_price = models.IntegerField()
    sell_time = models.DateTimeField()
    #source denotes where the item bought from
    source = models.CharField(max_length=100)
    status = models.CharField(max_length=30)
    expire_time = models.DateTimeField()
    tag = models.ManyToManyField(Tag)
    #
    final_buyer = models.ForeignKey(MyUser, null=True)


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True, default=0)
    tag_name = models.CharField(unique=True, max_length=20)


class Category(models.Model):
    catagory_id = models.AutoField(primary_key=True, default=0)
    catagory_name = models.CharField(max_length=40)