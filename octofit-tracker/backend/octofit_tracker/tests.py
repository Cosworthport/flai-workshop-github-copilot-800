from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='ironman',
            email='tony@avengers.com',
            password='pbkdf2$repulsor$tech'
        )

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        url = reverse('user-list')
        data = {
            'username': 'captain_america',
            'email': 'steve@avengers.com',
            'password': 'pbkdf2$shield$throw'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'captain_america')

    def test_retrieve_user(self):
        url = reverse('user-detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'ironman')


class TeamAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='superman',
            email='clark@justice.com',
            password='pbkdf2$krypton$fly'
        )
        self.team = Team.objects.create(name='Team DC')
        self.team.members.add(self.user)

    def test_list_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        url = reverse('team-list')
        data = {'name': 'Team Marvel'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Team Marvel')


class ActivityAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='thor_odinson',
            email='thor@avengers.com',
            password='pbkdf2$mjolnir$strike'
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='weightlifting',
            duration=75,
            date=date(2026, 2, 2)
        )

    def test_list_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_activity(self):
        url = reverse('activity-detail', args=[self.activity.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['activity_type'], 'weightlifting')


class LeaderboardAPITests(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Marvel')
        self.entry = Leaderboard.objects.create(team=self.team, score=4850)

    def test_list_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_leaderboard_entry(self):
        url = reverse('leaderboard-detail', args=[self.entry.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['score'], 4850)


class WorkoutAPITests(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Avengers Endurance Run',
            description='Long-distance running inspired by Captain America.',
            duration=60
        )

    def test_list_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_workout(self):
        url = reverse('workout-detail', args=[self.workout.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Avengers Endurance Run')


class ApiRootTests(APITestCase):
    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
