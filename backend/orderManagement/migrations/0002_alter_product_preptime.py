# Generated by Django 5.1.6 on 2025-02-20 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orderManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='prepTime',
            field=models.IntegerField(),
        ),
    ]
