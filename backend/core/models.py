from django.db import models

class DefaultModel(models.Model):
    """
    An abstract base model that provides common fields for all models.
    """
    created = models.DateTimeField(db_index=True, auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta: 
        abstract =True

        