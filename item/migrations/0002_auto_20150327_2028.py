# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20150327_2028'),
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='final_buyer',
            field=models.ForeignKey(null=True, blank=True, related_name='myBoughtItem', to='user.Account'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='item',
            name='owner',
            field=models.ForeignKey(null=True, to='user.Account', related_name='myItem'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='item',
            name='owner_name',
            field=models.CharField(blank=True, max_length=40),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='item',
            name='tag',
            field=models.ManyToManyField(null=True, to='item.Tag'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='item',
            name='item_id',
            field=models.AutoField(serialize=False, primary_key=True),
            preserve_default=True,
        ),
    ]
