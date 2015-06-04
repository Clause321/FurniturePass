# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import item.util


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0006_auto_20150528_0923'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='banner',
            field=models.ImageField(null=True, upload_to=item.util.upload_helper, blank=True),
            preserve_default=True,
        ),
    ]
