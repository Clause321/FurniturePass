# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import item.util


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='image1',
            field=models.ImageField(upload_to=item.util.upload_helper, blank=True, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='item',
            name='image2',
            field=models.ImageField(upload_to=item.util.upload_helper, blank=True, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='item',
            name='image3',
            field=models.ImageField(upload_to=item.util.upload_helper, blank=True, null=True),
            preserve_default=True,
        ),
    ]
