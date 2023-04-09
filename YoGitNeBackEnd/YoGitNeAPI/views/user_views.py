
from django.shortcuts import render
from YoGitNeAPI.models import MyUser
from ..serializers.user_serializer import MyUserSerializer
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from YoGitNeBackEnd import settings

from rest_framework.authtoken.models import Token

from rest_framework import permissions
from django.utils.crypto import get_random_string

from django.http import HttpResponse


def valid_id(username):
	return '@' not in username


class SignUp(APIView):

	queryset = MyUser.objects.all()
	serializer_class = MyUserSerializer
	permission_classes = ()
	
## !!!!!!!!!!!!!! NEED TO BE DELETED  !!!!!!!!!!!!!!!!   ##
#	def get(self, request, format=None):
#	 	users = MyUser.objects.all()
#	 	serializer = MyUserSerializer(users, many=True)
#	 	return Response(serializer.data)

	def post(self, request, format=None):
		username = request.data['username']
		if not valid_id(username):
			return Response({'details':'ID should be mySNU ID'}, status=status.HTTP_400_BAD_REQUEST)
		serializer = MyUserSerializer(data=request.data)
		if serializer.is_valid():
			
			print(username+' sign up..')

			token = get_random_string(length=32)
			link = "http://52.79.122.22:8000/auth/" + token + "/"
			send_mail('YoGitNe Account Authentication', link, 'YoGitNe@gmail.com', [serializer.validated_data['username']+'@snu.ac.kr'], fail_silently=False)
			serializer.save(mySNU_verification_token=token, mySNU_verified=False)
			id = serializer.data['id']
			username = serializer.data['username']
			verified = serializer.data['mySNU_verified']
			return Response(data={'id': id, \
								'username' : username, \
								'mySNU_verified' : verified},\
								status=status.HTTP_201_CREATED)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Authenticate(APIView):

	queryset = MyUser.objects.all()
	serializer_class = MyUserSerializer
	permission_classes = ()  
		
	def get(self, request, mySNU_verification_token, format=None):
		try :
			user = MyUser.objects.get(mySNU_verification_token=mySNU_verification_token)
		except MyUser.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		# If verification already done,
		if user.mySNU_verified :
			return Response({'details':'Already verified.'},status=status.HTTP_400_BAD_REQUEST)
		print('authenticate..')
		serializer = MyUserSerializer(user, data={'mySNU_verified': True}, partial=True)
		if serializer.is_valid():
			serializer.save()
			id = serializer.data['id']
			username = serializer.data['username']
			verified = serializer.data['mySNU_verified']
			return HttpResponse('Welcome, '+username+'! You are mySNU Verified!', status=202)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignIn(APIView):

	queryset = MyUser.objects.all()
	serializer_class = MyUserSerializer
	permission_classes = (permissions.IsAuthenticated,)  

	def get(self, request, format=None):
		print('log in..')
		user = request.user
		if user.mySNU_verified == True:
			return Response(data = {'username': user.username}, status=status.HTTP_202_ACCEPTED)
		else :
			return Response(data = {'details' : 'Not SNU verified.'}, status=status.HTTP_403_FORBIDDEN)
		
		
	
