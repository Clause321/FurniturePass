from django.db import models
from django.contrib.auth.models import User
from item.models import Item, Tag, Category

class MyUser(models.Model):
    user = models.OneToOneField(User)
    item = models.ManyToManyField(Item, through='RelatedItem')

    def __str__(self):
        return self.user.username

class Expect(models.Model):
    category = models.ManyToManyField(Category)
    lower = models.DecimalField(max_digits=8, decimal_places=2) # maximum == 999,999.99
    upper = models.DecimalField(max_digits=8, decimal_places=2)
    user = models.ForeignKey(MyUser)
    tag = models.ManyToManyField(Tag)                           # other tags that are not primary

    def __str__(self):
        return '%s expects %s' % (self.user, self.category)

class RelatedItem(models.Model):
    WATCHING = 'WA'
    BUYING = 'BY'
    BOUGHT = 'BT'
    TYPE_CHOICES = (
        (WATCHING, 'Watching'),
        (BUYING, 'Buying'),
        (BOUGHT, 'Bought'),
    )
    user = models.ForeignKey(MyUser)
    item = models.ForeignKey(Item)
    type = models.CharField(max_length=2, choices=TYPE_CHOICES)
