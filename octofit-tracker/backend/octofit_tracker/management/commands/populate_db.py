from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')

        # Delete all existing data in reverse dependency order
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')

        # Team Marvel heroes
        tony = User.objects.create(
            name='Tony Stark',
            username='ironman',
            email='tony@avengers.com',
            password='pbkdf2$repulsor$tech'
        )
        steve = User.objects.create(
            name='Steve Rogers',
            username='captain_america',
            email='steve@avengers.com',
            password='pbkdf2$shield$throw'
        )
        thor = User.objects.create(
            name='Thor Odinson',
            username='thor_odinson',
            email='thor@avengers.com',
            password='pbkdf2$mjolnir$strike'
        )
        natasha = User.objects.create(
            name='Natasha Romanoff',
            username='black_widow',
            email='natasha@avengers.com',
            password='pbkdf2$widow$sting'
        )
        bruce = User.objects.create(
            name='Bruce Banner',
            username='hulk',
            email='bruce@avengers.com',
            password='pbkdf2$gamma$smash'
        )

        # Team DC heroes
        clark = User.objects.create(
            name='Clark Kent',
            username='superman',
            email='clark@justice.com',
            password='pbkdf2$krypton$fly'
        )
        batman = User.objects.create(
            name='Bruce Wayne',
            username='batman',
            email='bruce@justice.com',
            password='pbkdf2$dark$knight'
        )
        diana = User.objects.create(
            name='Diana Prince',
            username='wonder_woman',
            email='diana@justice.com',
            password='pbkdf2$lasso$truth'
        )
        barry = User.objects.create(
            name='Barry Allen',
            username='the_flash',
            email='barry@justice.com',
            password='pbkdf2$speed$force'
        )
        hal = User.objects.create(
            name='Hal Jordan',
            username='green_lantern',
            email='hal@justice.com',
            password='pbkdf2$power$ring'
        )

        self.stdout.write('Creating teams...')

        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.add(tony, steve, thor, natasha, bruce)

        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.add(clark, batman, diana, barry, hal)

        self.stdout.write('Creating activities...')

        activities_data = [
            (tony, 'running', 30, date(2026, 2, 1)),
            (tony, 'weightlifting', 45, date(2026, 2, 3)),
            (steve, 'running', 60, date(2026, 2, 1)),
            (steve, 'cycling', 90, date(2026, 2, 4)),
            (thor, 'weightlifting', 75, date(2026, 2, 2)),
            (thor, 'running', 45, date(2026, 2, 5)),
            (natasha, 'yoga', 60, date(2026, 2, 2)),
            (natasha, 'swimming', 40, date(2026, 2, 6)),
            (bruce, 'cycling', 50, date(2026, 2, 3)),
            (bruce, 'weightlifting', 80, date(2026, 2, 7)),
            (clark, 'running', 20, date(2026, 2, 1)),
            (clark, 'hiking', 120, date(2026, 2, 4)),
            (batman, 'weightlifting', 90, date(2026, 2, 2)),
            (batman, 'running', 45, date(2026, 2, 5)),
            (diana, 'yoga', 50, date(2026, 2, 3)),
            (diana, 'swimming', 60, date(2026, 2, 6)),
            (barry, 'running', 15, date(2026, 2, 1)),
            (barry, 'cycling', 30, date(2026, 2, 3)),
            (hal, 'yoga', 45, date(2026, 2, 4)),
            (hal, 'weightlifting', 60, date(2026, 2, 7)),
        ]

        for user, activity_type, duration, act_date in activities_data:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration=duration,
                date=act_date
            )

        self.stdout.write('Creating leaderboard entries...')

        Leaderboard.objects.create(team=team_marvel, score=4850)
        Leaderboard.objects.create(team=team_dc, score=4400)

        self.stdout.write('Creating workouts...')

        workouts_data = [
            ('Avengers Endurance Run', 'Long-distance running inspired by Captain America\'s morning jogs through New York City.', 60),
            ('Iron Man HIIT', 'High-intensity interval training modeled after Tony Stark\'s arc reactor-powered workouts.', 45),
            ('Thor\'s Hammer Strength', 'Heavy weightlifting routine based on Thor\'s legendary strength training with Mjolnir.', 75),
            ('Black Widow Flexibility', 'Yoga and stretching routine inspired by Natasha Romanoff\'s acrobatic combat style.', 50),
            ('Hulk Power Circuit', 'Full-body strength circuit designed to build explosive power like Bruce Banner\'s alter ego.', 80),
            ('Superman Speed Drill', 'Sprint intervals to push your speed to superhuman levels like Clark Kent.', 30),
            ('Batman Combat Training', 'Mixed martial arts and weightlifting routine based on Bruce Wayne\'s training regimen.', 90),
            ('Wonder Woman Warriors Yoga', 'Strength and flexibility yoga routine inspired by Diana Prince\'s Amazonian training.', 55),
            ('Flash Cardio Blast', 'Ultra-fast cycling and sprint session inspired by Barry Allen\'s speed force.', 25),
            ('Green Lantern Core Power', 'Core-focused workout to channel willpower like Hal Jordan wielding the power ring.', 40),
        ]

        for name, description, duration in workouts_data:
            Workout.objects.create(name=name, description=description, duration=duration)

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with superhero test data!'))
        self.stdout.write(f'  Users: {User.objects.count()}')
        self.stdout.write(f'  Teams: {Team.objects.count()}')
        self.stdout.write(f'  Activities: {Activity.objects.count()}')
        self.stdout.write(f'  Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'  Workouts: {Workout.objects.count()}')
