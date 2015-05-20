# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('category_name', models.CharField(null=True, max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('item_name', models.CharField(null=True, max_length=40, unique=True)),
                ('item_id', models.AutoField(serialize=False, primary_key=True)),
                ('sell_price', models.IntegerField()),
                ('sell_time', models.DateTimeField(null=True, blank=True)),
                ('source', models.CharField(null=True, blank=True, max_length=100)),
                ('status', models.CharField(null=True, default='on sale', blank=True, max_length=30)),
                ('expire_time', models.DateTimeField()),
                ('description', models.TextField(null=True)),
                ('image1', models.ImageField(null=True, blank=True, upload_to='photo')),
                ('image2', models.ImageField(null=True, blank=True, upload_to='photo')),
                ('image3', models.ImageField(null=True, blank=True, upload_to='photo')),
                ('category', models.ManyToManyField(blank=True, to='item.Category')),
                ('final_buyer', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True, blank=True, related_name='myBoughtItem')),
                ('owner', models.ForeignKey(null=True, to=settings.AUTH_USER_MODEL, related_name='myItem')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('tag_name', models.CharField(null=True, max_length=20, unique=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='item',
            name='tag',
            field=models.ManyToManyField(blank=True, to='item.Tag'),
            preserve_default=True,
        ),
    ]
