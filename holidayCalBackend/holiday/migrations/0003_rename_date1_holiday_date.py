# Generated by Django 5.0.2 on 2024-03-11 21:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('holiday', '0002_rename_date_holiday_date1'),
    ]

    operations = [
        migrations.RenameField(
            model_name='holiday',
            old_name='date1',
            new_name='date',
        ),
    ]
