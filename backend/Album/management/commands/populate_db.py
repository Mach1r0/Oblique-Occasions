from django.core.management.base import BaseCommand
from django.utils import timezone
from Album.models import Album
from Artist.models import Artist
from Genrer.models import Genrer
from user.models import User
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of albums to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        
        # Create artists
        artists = []
        for _ in range(total // 2):  # Create half as many artists as albums
            user = User.objects.create(
                name=fake.name(),
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password()
            )
            artist = Artist.objects.create(
                user=user,
                bio=fake.text(),
                age=random.randint(18, 70),
                gender=random.choice(['male', 'female', 'other'])
            )
            artists.append(artist)

        # Create genres
        genres = []
        for _ in range(5):  # Create 5 genres
            genre = Genrer.objects.create(
                name=fake.word(),
                description=fake.sentence()
            )
            genres.append(genre)

        # Create albums
        for _ in range(total):
            album = Album.objects.create(
                title=fake.sentence(nb_words=3),
                ReleaseDate=fake.date_time_between(start_date='-10y', end_date='now', tzinfo=timezone.get_current_timezone()),
                price=round(random.uniform(5.99, 29.99), 2),
                Artist=random.choice(artists),
                bio=fake.text()
            )
            # Add random genres to the album
            album.genres.set(random.sample(genres, random.randint(1, 3)))

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} albums'))