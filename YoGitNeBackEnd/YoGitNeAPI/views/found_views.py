# Views for 'found' related operations.

from django.http import HttpResponse, JsonResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsRelatedOrReadOnly, IsOwnerOrReadOnly, IsVerified

from ..serializers.found_serializer import FoundSerializer

from ..models import Found, MyUser, Who_checked

from copy import deepcopy
import datetime

from ..helpers import author_adder, checker_adder, censor_name, imageResizer, id_to_name, comment_count_adder, dict_adder

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# TODO
# - Old case logic ref : https://chartio.com/resources/tutorials/how-to-filter-for-empty-or-null-values-in-a-django-queryset/
# - case_close-bywhome and when should be null, and once added, then read-only...
# - Maybe exclude closed data when initially creating the post


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsVerified, ))
def index_with_page(request, page_number):
	found_list = Found.objects.filter( \
		Q(case_closed = False) \
		& Q(created_date__date = datetime.datetime.today()) \
		).order_by('-created_date')
			
	paginator = Paginator(found_list, 10)
	try:
		founds = paginator.page(page_number)
	except PageNotAnInteger:
		founds = paginator.page(1)
	except EmptyPage:
		founds = paginator.page(paginator.num_pages)
		
	serializer = FoundSerializer(founds, many=True, \
		fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'image', 'view_count'),\
		context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = comment_count_adder(post, False)
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', founds.start_index() + i)
		i = i + 1
		ret_data.append(post)
	return Response({'key':{'total_page_number':paginator.num_pages}, 'found':ret_data})



@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, IsVerified, ))
def index(request):
	if request.method == 'GET':
		founds = Found.objects.filter( \
			Q(case_closed = False) \
			& Q(created_date__date = datetime.datetime.today()) \
			)
		serializer = FoundSerializer(founds, many=True, \
			fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'image', 'view_count'),\
			context={'request': request})
		ret_data = []
		for post in serializer.data:
			#ret_data = [*ret_data, author_adder(post, request.user.username)]
			post = comment_count_adder(post, False)
			ret_data.append(author_adder(post, request.user.username))
		return Response(ret_data, status=status.HTTP_200_OK)


	elif request.method == 'POST': # need to use --form option
		data = imageResizer(request.data)
		serializer = FoundSerializer(data=data,\
				 excludings=('case_closed', 'case_closed_date', 'case_closed_by_whom', 'view_count'),\
				 context={'request': request})
		if serializer.is_valid():
			serializer.save(author=request.user)
			# Should 'how_to_contact be returned?'
			return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_201_CREATED)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@permission_classes((IsAuthenticated, IsVerified, ))
@api_view(['GET'])
def closed_with_page(request, page_number):
	found_list = Found.objects.filter(Q(case_closed = True)).order_by('-created_date')

	paginator = Paginator(found_list, 10)
	try:
		founds = paginator.page(page_number)
	except PageNotAnInteger:
		founds = paginator.page(1)
	except EmptyPage:
		founds = paginator.page(paginator.num_pages)
		
	serializer = FoundSerializer(founds, many=True,\
								fields=('id', 'author', 'text', 'longitude', \
										'latitude', 'title', 'created_date', \
										'case_closed_by_whom', 'case_closed_date', 'view_count', 'image'),\
								context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		post = comment_count_adder(post, False)
		post['case_closed_by_whom_name'] = id_to_name(post['case_closed_by_whom'], request.user.username)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', founds.start_index() + i)
		i = i + 1		
		ret_data.append(post)
	return Response({'key':{'total_page_number':paginator.num_pages}, 'found':ret_data})


@permission_classes((IsAuthenticated, IsVerified, ))
@api_view(['GET'])
def closed(request):
	founds = Found.objects.filter(Q(case_closed = True))
	serializer = FoundSerializer(founds, many=True,\
								fields=('id', 'author', 'text', 'longitude', \
										'latitude', 'title', 'created_date', \
										'case_closed_by_whom', 'case_closed_date', 'view_count', 'image'),\
								context={'request': request})
	ret_data = []
	for post in serializer.data:
		post = comment_count_adder(post, False)
		post['case_closed_by_whom_name'] = id_to_name(post['case_closed_by_whom'], request.user.username)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		ret_data.append(author_adder(post, request.user.username))
	return Response(ret_data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, IsVerified, ))
@api_view(['GET'])
def old_with_page(request, page_number):
	found_list = Found.objects.filter( \
		Q(case_closed = False) \
		& ~Q(created_date__date = datetime.datetime.today()) \
		).order_by('-created_date')

	paginator = Paginator(found_list, 10)
	try:
		founds = paginator.page(page_number)
	except PageNotAnInteger:
		founds = paginator.page(1)
	except EmptyPage:
		founds = paginator.page(paginator.num_pages)
	
	serializer = FoundSerializer(founds, many=True, fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'view_count', 'image'),\
							context={'request': request})
	ret_data = []
	i = 0
	for post in serializer.data:
		post = comment_count_adder(post, False)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		post = author_adder(post, request.user.username)
		post = dict_adder(post, 'order', founds.start_index() + i)
		i = i + 1

		ret_data.append(post)
	return Response({'key':{'total_page_number':paginator.num_pages}, 'found':ret_data})


@permission_classes((IsAuthenticated, IsVerified, ))
@api_view(['GET'])
def old(request):
	founds = Found.objects.filter( \
		Q(case_closed = False) \
		& ~Q(created_date__date = datetime.datetime.today()) \
		)
	serializer = FoundSerializer(founds, many=True, fields=('id', 'author', 'text', 'longitude', 'latitude', 'title', 'created_date', 'view_count', 'image'),\
							context={'request': request})
	ret_data = []
	for post in serializer.data:
		post = comment_count_adder(post, False)
		#ret_data = [*ret_data, author_adder(post, request.user.username)]
		ret_data.append(author_adder(post, request.user.username))
	return Response(ret_data, status=status.HTTP_200_OK)



class detail(APIView):
	permission_classes = (IsAuthenticated, IsVerified, IsOwnerOrReadOnly,)

	def put(self, request, post_id, format=None):
		try:
			found = Found.objects.get(id=post_id)
		except Found.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)	
		self.check_object_permissions(self.request, found)
		data = imageResizer(request.data)
		data['modified_count'] = found.__dict__['modified_count']+1
		data['view_count'] = found.__dict__['view_count']
		# Commented line will exclude those fields from modified,
		# but it should be included and returned after modification.
		# NEEDS TO FIND A WAY TO MAKE FIELDS WROTE ONLY ONCE
		serializer = FoundSerializer(found, data=data, partial=True, \
									context={'request': request})#excludings=('case_closed', 'case_closed_date', 'case_closed_by_whom'))
		if serializer.is_valid():
			serializer.save()
			ret_data = checker_adder(serializer.data, request.user.username)
			return Response(author_adder(ret_data, request.user.username), status=status.HTTP_200_OK)
		else :
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, post_id, format=None):
		try:
			found = Found.objects.get(id=post_id)
			found.view_count = found.view_count+1
			found.save()
		except Found.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		serializer = FoundSerializer(found, excludings=('how_to_contact',), context={'request': request})
		ret_data = checker_adder(serializer.data, request.user.username)
		# If requesting user is author, then return how_to_contact together
		if request.user.username == found.author.username:
			ret_data['how_to_contact'] = found.how_to_contact
		# If requesting user have checked already, return how_to_contact
		# print(ret_data['checkers'])
		if ret_data['checkers'] :
			checker_names, date = zip(*ret_data['checkers'])
			if request.user.username in checker_names:
				ret_data['how_to_contact'] = found.how_to_contact
		if ret_data['case_closed'] :
			ret_data['case_closed_by_whom_name'] = id_to_name(ret_data['case_closed_by_whom'], request.user.username)
		return Response(author_adder(ret_data, request.user.username), status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated, IsVerified,))
def check(request, post_id):
	try:
		found = Found.objects.get(id=post_id)
		checker = request.user
	except (Found.DoesNotExist) as error:
		return Response(status=status.HTTP_404_NOT_FOUND)
	# If user is author him/herself,
	if found.author == checker:
		return Response({'details':'Author do not need to check.'}, status=status.HTTP_400_BAD_REQUEST)
	# If user already have checked information before,
	if Who_checked.objects \
		.filter(Q(post=found) & Q(who=checker)) \
		.exists():
		where = found.how_to_contact
		return Response(data={'how_to_contact':where}, status=status.HTTP_200_OK)
	else :
		Who_checked.objects.create(post=found, who=checker)
		where = found.how_to_contact
		return Response(data={'how_to_contact':where}, status=status.HTTP_200_OK)


class case_close(APIView):
	permission_classes = (IsAuthenticated, IsVerified, IsRelatedOrReadOnly, )

	def put(self, request, post_id, format=None):
		try:
			found = Found.objects.get(id=post_id)
			user = request.user
		except (Found.DoesNotExist) as error:
			return Response(status=status.HTTP_404_NOT_FOUND)
		if found.case_closed :
			return Response(data={'detail':'Already closed'}, status=status.HTTP_400_BAD_REQUEST)
		else :
			self.check_object_permissions(self.request, found)
			serializer = FoundSerializer(found, data={'case_closed': True, \
											'case_closed_by_whom': user.id, \
											'case_closed_date' : datetime.datetime.now()}, \
											partial=True, context={'request': request})
			if serializer.is_valid():
				serializer.save()
				author_name_added_dict = author_adder(serializer.data, request.user.username)
				author_name_added_dict['case_closed_by_whom_name'] = censor_name(user.username, request.user.username)
				ret_data = checker_adder(author_name_added_dict, request.user.username)
				return Response(ret_data, status=status.HTTP_200_OK)
