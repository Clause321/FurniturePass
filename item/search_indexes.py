__author__ = 'renl'
from haystack import indexes
from item.models import Item

class ItemIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    item_name = indexes.CharField(model_attr='item_name')
    description = indexes.CharField(model_attr='description')

    def get_model(self):
        return Item

    def index_queryset(self, using=None):
        return self.get_model().objects.all()