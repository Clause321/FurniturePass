from django.conf.urls import patterns, include, url
from django.contrib import admin
from item.views import ItemsList

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'FurniturePass.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^boxs/json/(?P<pk>\d+)$', ItemsList.as_view(), name='items-list')
)
