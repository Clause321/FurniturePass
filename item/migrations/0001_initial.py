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
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('catagory_name', models.CharField(null=True, max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('item_id', models.AutoField(primary_key=True, default=0, serialize=False)),
                ('sell_price', models.IntegerField(null=True)),
                ('sell_time', models.DateTimeField(null=True)),
                ('source', models.CharField(null=True, max_length=100)),
                ('status', models.CharField(null=True, max_length=30)),
                ('expire_time', models.DateTimeField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('tag_name', models.CharField(null=True, unique=True, max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
