# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0002_auto_20150520_0303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='item_name',
            field=models.CharField(null=True, max_length=40),
            preserve_default=True,
        ),
    ]
