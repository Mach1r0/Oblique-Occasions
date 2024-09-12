# Generated by Django 5.0.3 on 2024-09-12 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Artist', '0004_artist_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='soundcloud',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='spotify',
            field=models.URLField(blank=True, null=True),
        ),
    ]
