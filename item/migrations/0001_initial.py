# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
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
                ('item_id', models.AutoField(default=0, serialize=False, primary_key=True)),
                ('sell_price', models.IntegerField(null=True, blank=True)),
                ('sell_time', models.DateTimeField(null=True, blank=True)),
                ('source', models.CharField(max_length=100, null=True)),
                ('status', models.CharField(max_length=30, null=True)),
                ('expire_time', models.DateTimeField(null=True)),
                ('description', models.TextField(null=True)),
                ('catagory', models.ManyToManyField(to='item.Category', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag_name', models.CharField(max_length=20, unique=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
