# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expect',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lower', models.DecimalField(max_digits=8, decimal_places=2)),
                ('upper', models.DecimalField(max_digits=8, decimal_places=2)),
                ('category', models.ManyToManyField(to='item.Category')),
                ('tag', models.ManyToManyField(to='item.Tag')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RelatedItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=2, choices=[(b'WA', b'Watching'), (b'BY', b'Buying'), (b'BT', b'Bought')])),
                ('item', models.ForeignKey(to='item.Item')),
                ('user', models.ForeignKey(to='user.MyUser')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='myuser',
            name='item',
            field=models.ManyToManyField(to='item.Item', through='user.RelatedItem'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='myuser',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='expect',
            name='user',
            field=models.ForeignKey(to='user.MyUser'),
            preserve_default=True,
        ),
    ]
