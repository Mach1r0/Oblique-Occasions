from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class Album(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    ReleaseDate = models.DateTimeField(default=timezone.now)
    price = models.FloatField()
    Artist = models.ForeignKey('Artist.Artist', on_delete=models.CASCADE, blank=False, null=False, related_name='albums')  # Usar string
    genres = models.ManyToManyField('Genrer.Genrer', blank=True)  # Usar string se necessário
    picture = models.ImageField(upload_to='albums-img/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if Album.objects.filter(slug=self.slug).exists():
            count = 1
            while Album.objects.filter(slug=f"{self.slug}-{count}").exists():
                count += 1
            self.slug = f"{self.slug}-{count}"
        super().save(*args, **kwargs)