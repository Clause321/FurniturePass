# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
                ('email', models.EmailField(unique=True, max_length=75)),
                ('username', models.CharField(unique=True, max_length=20)),
                ('first_name', models.CharField(blank=True, max_length=20)),
                ('last_name', models.CharField(blank=True, max_length=20)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='expect',
            name='category',
        ),
        migrations.RemoveField(
            model_name='expect',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='expect',
            name='user',
        ),
        migrations.DeleteModel(
            name='Expect',
        ),
        migrations.RemoveField(
            model_name='myuser',
            name='item',
        ),
        migrations.RemoveField(
            model_name='myuser',
            name='user',
        ),
        migrations.RemoveField(
            model_name='relateditem',
            name='item',
        ),
        migrations.RemoveField(
            model_name='relateditem',
            name='user',
        ),
        migrations.DeleteModel(
            name='MyUser',
        ),
        migrations.DeleteModel(
            name='RelatedItem',
        ),
    ]
