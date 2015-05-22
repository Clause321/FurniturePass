from django.conf.urls import patterns, include, url
from django.contrib import admin
from item.views import *
from user.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'FurniturePass.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/repo/(?P<pk>\d+)$', ItemsList.as_view(), name='items-list'),
    url(r'^api/item/(?P<pk>\d+)$', SingleItem.as_view(), name='item'),
    url(r'^api/category$', CategoryView.as_view(), name='category'),
    url(r'^api/tag', TagView.as_view(), name='tag'),
    url(r'^myreprocitory/(?P<pk>\d+)$', repo_index),
    url(r'^myaccount$', my_account),
    url(r'^item/(?P<pk>\d+)', item_view),
    url(r'^user/upload$', add_product)
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL,
                                                                             document_root=settings.MEDIA_ROOT)