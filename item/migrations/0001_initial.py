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
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('catagory_name', models.CharField(max_length=40, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('item_name', models.CharField(max_length=40, null=True)),
                ('item_id', models.AutoField(serialize=False, primary_key=True)),
                ('sell_price', models.IntegerField()),
                ('sell_time', models.DateTimeField(null=True, blank=True)),
                ('source', models.CharField(max_length=100, null=True, blank=True)),
                ('status', models.CharField(default='on sale', max_length=30, null=True, blank=True)),
                ('expire_time', models.DateTimeField()),
                ('description', models.TextField(null=True)),
                ('catagory', models.ManyToManyField(to='item.Category', blank=True)),
                ('final_buyer', models.ForeignKey(related_name='myBoughtItem', null=True, to=settings.AUTH_USER_MODEL, blank=True)),
                ('owner', models.ForeignKey(related_name='myItem', null=True, to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('tag_name', models.CharField(max_length=20, unique=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='static',
            name='tag',
            field=models.ManyToManyField(to='item.Tag', blank=True),
            preserve_default=True,
        ),
    ]
