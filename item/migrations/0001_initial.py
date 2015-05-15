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
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('catagory_name', models.CharField(null=True, max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('item_name', models.CharField(null=True, max_length=40)),
                ('item_id', models.AutoField(primary_key=True, serialize=False)),
                ('sell_price', models.IntegerField()),
                ('sell_time', models.DateTimeField(blank=True, null=True)),
                ('source', models.CharField(blank=True, null=True, max_length=100)),
                ('status', models.CharField(blank=True, default='on sale', null=True, max_length=30)),
                ('expire_time', models.DateTimeField()),
                ('description', models.TextField(null=True)),
                ('catagory', models.ManyToManyField(blank=True, to='item.Category')),
                ('final_buyer', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True, related_name='myBoughtItem', blank=True)),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True, related_name='myItem')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('tag_name', models.CharField(unique=True, null=True, max_length=20)),
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
