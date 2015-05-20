from django import forms
from django.contrib.admin import widgets
from datetimewidget.widgets import DateTimeWidget
from item.models import Item
__author__ = 'renl'


class UploadForm(forms.Form):
    """
    from django.contrib.admin import widgets
    class Meta:
        model = Item

    def __init__(self, *args, **kwargs):
        super(Item, self).__init__(*args, **kwargs)
        self.fields['expire_time'].widget = widgets.AdminSplitDateTime()
        self.fields['sell_time'].widget = widgets.AdminSplitDateTime()
    """
    item_name = forms.CharField(label="item name", max_length=40)
    sell_price = forms.IntegerField(label="sell price")
    source = forms.CharField(label="source", max_length=100)
    expire_time = forms.DateTimeField(label="expire time", widget=DateTimeWidget)
    #tag = models.ManyToManyField(Tag, blank=True)
    #catagory = models.ManyToManyField(Category, blank=True)
    description = forms.CharField(label="description", widget=forms.Textarea)
    image1 = forms.ImageField()
    image2 = forms.ImageField()
    image3 = forms.ImageField()