# Generated by Django 5.0.2 on 2024-03-11 21:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('holiday', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='holiday',
            old_name='date',
            new_name='date1',
        ),
    ]