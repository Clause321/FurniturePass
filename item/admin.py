from django.contrib import admin
from item.models import *

class TagAdmin(admin.ModelAdmin):
    list_display = ['tag_name']
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'category_name']
class ItemAdmin(admin.ModelAdmin):
    list_display = ['item_id', 'item_name', 'owner']

# Register your models here.
admin.site.register(Item, ItemAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Category, CategoryAdmin)