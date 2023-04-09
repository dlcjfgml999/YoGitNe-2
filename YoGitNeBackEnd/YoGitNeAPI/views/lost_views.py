# Views for 'lost' related operations.

from django.http import HttpResponse, JsonResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from ..permissions import IsRelatedOrReadOnly, IsOwnerOrReadOnly, IsVerified

from ..serializers.lost_serializer import LostSerializer

from ..models import Lost

from copy import deepcopy
import datetime

from ..helpers import author_adder, censor_name, imageResizer, id_to_name, comment_count_adder, dict_adder

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsVerified,))
def index_with_page(request, page_number):
	lost_list = Lost.objects.filter( \
		Q(case_closed = False) \
		& Q(created_date__date = datetime.datetime.today()) \
		).order_by('-created_date')

	paginator = Paginator(lost_list, 10)
	try:
		losts = paginator.page(page_number)
	except PageNotAnInteger:
		losts = paginator.page(1)
	except EmptyPage:
		losts = paginator.page(paginator.num_pages)

	serializer = LostSerializer(losts, many=True,\
			fields=('id', 'author', 'text','longitude', 'latitude', 'title', 'created_date', 'image', 'view_count'),\
			context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = comment_count_adder(post, True)
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', losts.start_index() + i)
		i = i + 1
		ret_data.append(post)
		
	return Response({'key':{'total_page_number':paginator.num_pages}, 'lost':ret_data})


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, IsVerified,))
def index(request):
	if request.method == 'GET':
		losts = Lost.objects.filter( \
			Q(case_closed = False) \
			& Q(created_date__date = datetime.datetime.today()) \
			)
		serializer = LostSerializer(losts, many=True,\
				fields=('id', 'author', 'text','longitude', 'latitude', 'title', 'created_date', 'image', 'view_count'),\
				context={'request': request})
		ret_data = []
		for post in serializer.data:
			#ret_data = [*ret_data, author_adder(post, request.user.username)]
			post = comment_count_adder(post, True)
			ret_data.append(author_adder(post,request.user.username))
		return Response(ret_data, status=status.HTTP_200_OK)


	elif request.method == 'POST': # need to use --form option
		data = imageResizer(request.data)
		serializer = LostSerializer(data=data, excludings=('case_closed', 'case_closed_date', 'case_closed_by_whom', 'view_count'),\
									context={'request': request})
		if serializer.is_valid():
			serializer.save(author=request.user)
			return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_201_CREATED)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes((IsAuthenticated, IsVerified,))
@api_view(['GET'])
def closed_with_page(request, page_number):
	lost_list = Lost.objects.filter(Q(case_closed = True)).order_by('-created_date')

	paginator = Paginator(lost_list, 10)
	try:
		losts = paginator.page(page_number)
	except PageNotAnInteger:
		losts = paginator.page(1)
	except EmptyPage:
		losts = paginator.page(paginator.num_pages)

	serializer = LostSerializer(losts, many=True,\
								fields=('id', 'author', 'text', 'longitude', \
										'latitude', 'title', 'created_date', \
										'case_closed_by_whom', 'case_closed_date', 'view_count', 'image'),\
								context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		post = comment_count_adder(post, True)
		post['case_closed_by_whom_name'] = id_to_name(post['case_closed_by_whom'], request.user.username)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', losts.start_index() + i)
		i = i + 1
		ret_data.append(post)
	return Response({'key':{'total_page_number':paginator.num_pages}, 'lost':ret_data})


@permission_classes((IsAuthenticated, IsVerified,))
@api_view(['GET'])
def closed(request):
	losts = Lost.objects.filter(Q(case_closed = True))
	serializer = LostSerializer(losts, many=True,\
								fields=('id', 'author', 'text', 'longitude', \
										'latitude', 'title', 'created_date', \
										'case_closed_by_whom', 'case_closed_date', 'view_count', 'image'),\
								context={'request': request})
	ret_data = []
	for post in serializer.data:
		post = comment_count_adder(post, True)
		post['case_closed_by_whom_name'] = id_to_name(post['case_closed_by_whom'], request.user.username)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		ret_data.append(author_adder(post, request.user.username))
	return Response(ret_data)


@permission_classes((IsAuthenticated, IsVerified,))
@api_view(['GET'])
def old_with_page(request, page_number):
	lost_list = Lost.objects.filter( \
		Q(case_closed = False) \
		& ~Q(created_date__date = datetime.datetime.today()) \
		).order_by('-created_date')

	paginator = Paginator(lost_list, 10)
	try:
		losts = paginator.page(page_number)
	except PageNotAnInteger:
		losts = paginator.page(1)
	except EmptyPage:
		losts = paginator.page(paginator.num_pages)

	serializer = LostSerializer(losts, many=True,\
				fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'view_count', 'image'),\
				context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = comment_count_adder(post, True)
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', losts.start_index() + i)
		i = i + 1
		ret_data.append(post)
	return Response({'key':{'total_page_number':paginator.num_pages}, 'lost':ret_data})


@permission_classes((IsAuthenticated, IsVerified,))
@api_view(['GET'])
def old(request):
	losts = Lost.objects.filter( \
		Q(case_closed = False) \
		& ~Q(created_date__date = datetime.datetime.today()) \
		)
	serializer = LostSerializer(losts, many=True,\
				fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'view_count', 'image'),\
				context={'request': request})
	ret_data = []
	for post in serializer.data:
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = comment_count_adder(post, True)
		ret_data.append(author_adder(post, request.user.username))
	return Response(ret_data)


class detail(APIView):
	permission_classes = (IsAuthenticated, IsVerified, IsOwnerOrReadOnly, )

	def put(self, request, post_id, format=None):
		try:
			lost = Lost.objects.get(id=post_id)
		except Lost.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		self.check_object_permissions(self.request, lost)
		data = imageResizer(request.data)
		data['modified_count'] = lost.__dict__['modified_count']+1
		data['view_count'] = lost.__dict__['view_count']
		serializer = LostSerializer(lost, data=data, partial=True, \
							context={'request': request})#excludings=('case_closed', 'case_closed_date', 'case_closed_by_whom'))
		if serializer.is_valid():
			serializer.save()
			return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_200_OK)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, post_id, format=None):
		try:
			lost = Lost.objects.get(id=post_id)
			lost.view_count = lost.view_count+1
			lost.save()
		except Lost.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		serializer = LostSerializer(lost, context={'request': request})
		ret_data = author_adder(serializer.data, request.user.username)
		if ret_data['case_closed'] :
			ret_data['case_closed_by_whom_name'] = id_to_name(ret_data['case_closed_by_whom'], request.user.username)
		return Response(ret_data)

class case_close(APIView):
	permission_classes = (IsAuthenticated, IsVerified, IsOwnerOrReadOnly,)

	def put(self, request, post_id, format=None):
		try:
			lost = Lost.objects.get(id=post_id)
			user = request.user
		except (Lost.DoesNotExist) as error:
			return Response(status=status.HTTP_404_NOT_FOUND)
		if lost.case_closed :
			return Response(data={'detail':'Already closed'}, status=status.HTTP_400_BAD_REQUEST)
		else : 
			self.check_object_permissions(self.request, lost)
			serializer = LostSerializer(lost, data={'case_closed': True, \
											'case_closed_by_whom': user.id, \
											'case_closed_date' : datetime.datetime.now()}, \
											partial=True, context={'request': request})
			if serializer.is_valid():
				serializer.save()
				author_name_added_dict = author_adder(serializer.data, request.user.username)
				author_name_added_dict['case_closed_by_whom_name'] = censor_name(user.username, request.user.username)
				return Response(author_name_added_dict, status=status.HTTP_200_OK)
