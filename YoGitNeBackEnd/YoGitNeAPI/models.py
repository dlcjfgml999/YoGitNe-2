from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import uuid, datetime

def scramble(instance, filename):
	now = datetime.datetime.now()
	nowDate = now.strftime('%Y/%m/%d/')
	extension = filename.split(".")[-1]
	return nowDate+"{}.{}".format(uuid.uuid4(), extension)

class MyUser(AbstractUser):
	# Django default 'User' serves a lot of basic functions.
	# What we will use are...
	# username : this will be same with mySNU ID
	# password, and other methods...
	# These are subject to be changed during project.
	# We should figure out what's the best way to authenticate user,
	# also considering about sessions.

	# Below are our custom fields.

	mySNU_verified = models.BooleanField(default=False)

	# random generated token for authentification
	# This will be sent to signing up user's mySNU mail.
	# mySNU verification will be done by checking this field.


	mySNU_verification_token = models.CharField(max_length=100, unique=True, blank=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        token = Token.objects.create(user=instance)


class Found (models.Model):
	# using default id for primary key
	author = models.ForeignKey(MyUser,
								on_delete=models.DO_NOTHING,
								related_name='found_author') # no cascade delete
																												# maybe set null?
	title = models.CharField(max_length = 50)
	text = models.TextField()
	image = models.ImageField(default='default.jpg', upload_to=scramble, blank=True, null=True)
	

	created_date = models.DateTimeField(auto_now_add=True)
	modified_date = models.DateTimeField(auto_now=True)
	modified_count = models.PositiveSmallIntegerField(default = 0)

	how_to_contact = models.TextField()

	latitude = models.FloatField()
	longitude = models.FloatField()

	# case_too_old = models.BooleanField(default=False)
	# We don't need this since django provide lots of features...
	
	case_closed = models.BooleanField(default=False)
	case_closed_by_whom = models.ForeignKey(MyUser,
											on_delete=models.DO_NOTHING,
											related_name='found_case_closed_by_whom',
											null=True,
											blank=True)
	case_closed_date = models.DateTimeField(null=True, blank=True)

	view_count = models.PositiveSmallIntegerField(default = 1)

class Who_checked(models.Model):
	post = models.ForeignKey(Found,
													 on_delete=models.DO_NOTHING,
													 related_name='who_checked_post')
	who = models.ForeignKey(MyUser,
													on_delete=models.DO_NOTHING,
													related_name='who_checked_who')

	checked_date = models.DateTimeField(auto_now_add=True)


class Lost(models.Model):
	# using default id for primary key
	author = models.ForeignKey(MyUser,
							on_delete=models.DO_NOTHING,
							related_name='lost_author') # no cascade delete
	title = models.CharField(max_length = 50)
	text = models.TextField()
	image = models.ImageField(default='default.jpg', upload_to=scramble, blank=True, null=True)
	

	created_date = models.DateTimeField(auto_now_add=True)
	modified_date = models.DateTimeField(auto_now=True)
	modified_count = models.PositiveSmallIntegerField(default = 0)

	latitude = models.FloatField()
	longitude = models.FloatField()

	#case_too_old = models.BooleanField(default=False)
	# We don't need this since django provide lots of features...
	
	case_closed = models.BooleanField(default=False)
	case_closed_by_whom = models.ForeignKey(MyUser,
											on_delete=models.DO_NOTHING,
											related_name='lost_case_closed_by_whom',
											null=True,
											blank=True)
	case_closed_date = models.DateTimeField(null=True, blank=True)

	view_count = models.PositiveSmallIntegerField(default = 1)

class Comment(models.Model):
	# using default id for primary key
	author = models.ForeignKey(MyUser,
														on_delete=models.DO_NOTHING,
														related_name='comment_author') # no cascade delete

	# indicates what's the type of the post
	# True for lost post, False for found post.
	is_lost_comment = models.BooleanField(default=False) 

	lost_post_id = models.ForeignKey(Lost,
									on_delete=models.DO_NOTHING,
									related_name='comment_lost_post_id',
									null=True) # no cascade delete
	found_post_id = models.ForeignKey(Found,
									on_delete=models.DO_NOTHING,
									related_name='comment_lost_post_id',
									null=True) # no cascade delete
	text = models.TextField()

	created_date = models.DateTimeField(auto_now_add=True)
	modified_date = models.DateTimeField(auto_now=True)
	modified_count = models.PositiveSmallIntegerField(default = 0)
