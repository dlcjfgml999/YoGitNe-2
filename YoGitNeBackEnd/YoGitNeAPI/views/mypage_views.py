from django.db.models import Q

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsVerified

from ..models import Found, Lost, MyUser, Who_checked, Comment

from ..serializers.found_serializer import FoundSerializer
from ..serializers.lost_serializer import LostSerializer
from ..serializers.user_serializer import MyUserSerializer
from ..serializers.comment_serializer import CommentSerializer

from ..helpers import author_adder, comment_count_adder, dict_adder

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


# At mypage,
# 1. My Posts(Found & Lost), v
# 2. My Comments, v
# 3. My checkings(Found) v
# 4. Password change v
# 5. My Information v


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsVerified, ))
def index(request):
	# User info
	user = request.user
	user_data = {'id' : user.id,\
				 'username' : user.username}
	# Found post info
	founds = Found.objects.filter( \
		Q(author = user)
		)
	found_serializer = FoundSerializer(founds, many=True, \
		fields=('id', 'title', 'created_date', 'image', 'view_count'),\
		context={'request': request})
	found_list = []
	for found in found_serializer.data:
		found = comment_count_adder(found, False)
		found_list.append(found)
	# Lost post info
	losts = Lost.objects.filter( \
		Q(author = user)
		)
	lost_serializer = LostSerializer(losts, many=True, \
		fields=('id', 'title', 'created_date', 'image', 'view_count'),\
		context={'request': request})
	lost_list = []
	for lost in lost_serializer.data:
		lost = comment_count_adder(lost, True)
		lost_list.append(lost)
	# Checking info
	who_checkeds = Who_checked.objects.filter(\
		Q(who = user)
		)
	checkings = []
	for check in who_checkeds:
		post = check.post
		post_serializer = FoundSerializer(post, \
			fields=('id', 'author', 'title', 'created_date', 'image', 'view_count'),\
			context={'request': request})
		new_check = {'found': author_adder(comment_count_adder(post_serializer.data, False), request.user.username),\
					 'checked_date':check.checked_date}
		#checkings = [*checkings, new_check] # Slow
		checkings.append(new_check)
	# Comments info
	comments = Comment.objects.filter(\
		Q(author = user)
		)
	lost_comments = []
	found_comments = []
	for comment in comments:
		comment_serializer = CommentSerializer(comment,\
			fields=('text', 'created_date'),\
			)
		if comment.is_lost_comment:
			post_serializer = LostSerializer(comment.lost_post_id, \
				fields=('id', 'author', 'title', 'created_date', 'isAuthor', 'image','view_count'),\
				context={'request': request})
			comment_info = {'lost': author_adder(comment_count_adder(post_serializer.data, True), request.user.username),\
							'comment': comment_serializer.data}
			lost_comments.append(comment_info)
		else:
			post_serializer = FoundSerializer(comment.found_post_id, \
				fields=('id', 'author', 'title', 'created_date', 'isAuthor', 'image', 'view_count'),\
				context={'request': request})
			comment_info = {'found': author_adder(comment_count_adder(post_serializer.data, False), request.user.username),\
							'comment': comment_serializer.data}
			found_comments.append(comment_info)

	ret_data = {'user':user_data,\
				'found':found_list,\
				'lost':lost_list,\
				'checking':checkings, \
				'comments':{'lost_comments':lost_comments, 'found_comments':found_comments}}
	return Response(data=ret_data, status= status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes((IsAuthenticated, IsVerified, ))
def index_with_page(request, found_page_number, lost_page_number, checking_page_number, found_comment_page_number, lost_comment_page_number):
	# User info
	user = request.user
	user_data = {'id' : user.id,\
				 'username' : user.username}
	# Found post info
	found_list = Found.objects.filter( \
		Q(author = user)
		).order_by('-created_date')

	paginator = Paginator(found_list, 10)
	try:
		founds = paginator.page(found_page_number)
	except PageNotAnInteger:
		founds = paginator.page(1)
	except EmptyPage:
		founds = paginator.page(paginator.num_pages)
	total_found_page_number = paginator.num_pages	

	found_serializer = FoundSerializer(founds, many=True, \
		fields=('id', 'title', 'created_date', 'image', 'view_count'),\
		context={'request': request})
	found_list = []
	i = 0
	for found in found_serializer.data:
		found = comment_count_adder(found, False)
		found = dict_adder(found, 'order', founds.start_index() + i)
		i = i + 1
		found_list.append(found)
	# Lost post info
	lost_list = Lost.objects.filter( \
		Q(author = user)
		).order_by('-created_date')

	paginator = Paginator(lost_list, 10)
	try:
		losts = paginator.page(lost_page_number)
	except PageNotAnInteger:
		losts = paginator.page(1)
	except EmptyPage:
		losts = paginator.page(paginator.num_pages)
	total_lost_page_number = paginator.num_pages

	lost_serializer = LostSerializer(losts, many=True, \
		fields=('id', 'title', 'created_date', 'image', 'view_count'),\
		context={'request': request})
	lost_list = []
	i = 0
	for lost in lost_serializer.data:
		lost = comment_count_adder(lost, True)
		lost = dict_adder(lost, 'order', losts.start_index() + i)
		i = i + 1
		lost_list.append(lost)
	# Checking info
	who_checked_list = Who_checked.objects.filter(\
		Q(who = user)
		).order_by('-checked_date')

	paginator = Paginator(who_checked_list, 10)
	try:
		who_checkeds = paginator.page(checking_page_number)
	except PageNotAnInteger:
		who_checkeds = paginator.page(1)
	except EmptyPage:
		who_checkeds = paginator.page(paginator.num_pages)
	total_checking_page_number = paginator.num_pages

	checkings = []
	i = 0
	for check in who_checkeds:
		post = check.post
		post_serializer = FoundSerializer(post, \
			fields=('id', 'author', 'title', 'created_date', 'image', 'view_count'),\
			context={'request': request})
		new_check = {'found': author_adder(comment_count_adder(post_serializer.data, False), request.user.username),\
					 'checked_date':check.checked_date}
		#checkings = [*checkings, new_check] # Slow
		res = dict_adder(new_check, 'order', who_checkeds.start_index() + i)
		i = i + 1
		checkings.append(res)


	# Comments info
	lost_comment_list = Comment.objects.filter(\
		Q(author = user), is_lost_comment=True
		).order_by('-created_date')

	paginator = Paginator(lost_comment_list, 10)
	try:
		lost_comments = paginator.page(lost_comment_page_number)
	except PageNotAnInteger:
		lost_comments = paginator.page(1)
	except EmptyPage:
		lost_comments = paginator.page(paginator.num_pages)	
	total_lost_comment_page_number = paginator.num_pages

	found_comment_list = Comment.objects.filter(\
		Q(author = user), is_lost_comment=False
		).order_by('-created_date')

	paginator = Paginator(found_comment_list, 10)
	try:
		found_comments = paginator.page(found_comment_page_number)
	except PageNotAnInteger:
		found_comments = paginator.page(1)
	except EmptyPage:
		found_comments = paginator.page(paginator.num_pages)
	total_found_comment_page_number = paginator.num_pages


	lost_comment_list = []
	found_comment_list = []
	
	i = 0
	for comment in lost_comments:
		comment_serializer = CommentSerializer(comment,\
			fields=('text', 'created_date'),\
			)
		post_serializer = LostSerializer(comment.lost_post_id, \
			fields=('id', 'author', 'title', 'created_date', 'isAuthor', 'image','view_count'),\
			context={'request': request})
		comment_info = {'lost': author_adder(comment_count_adder(post_serializer.data, True), request.user.username),\
							'comment': comment_serializer.data}
		res = dict_adder(comment_info, 'order', lost_comments.start_index() + i)
		i = i + 1
		lost_comment_list.append(res)

	i = 0
	for comment in found_comments:
		comment_serializer = CommentSerializer(comment,\
			fields=('text', 'created_date'),\
			)
		post_serializer = FoundSerializer(comment.found_post_id, \
			fields=('id', 'author', 'title', 'created_date', 'isAuthor', 'image', 'view_count'),\
			context={'request': request})
		comment_info = {'found': author_adder(comment_count_adder(post_serializer.data, False), request.user.username),\
							'comment': comment_serializer.data}
		res = dict_adder(comment_info, 'order', found_comments.start_index() + i)
		i = i + 1
		found_comment_list.append(res)




	ret_data = {'user':user_data,\
				'found':found_list,\
				'lost':lost_list,\
				'checking':checkings, \
				'lost_comments':lost_comment_list, 'found_comments':found_comment_list, 'found_key':{'total_page_number':total_found_page_number}, 'lost_key':{'total_page_number':total_lost_page_number}, 'checking_key':{'total_page_number':total_checking_page_number}, 'found_comment_key':{'total_page_number':total_found_comment_page_number}, 'lost_comment_key':{'total_page_number':total_lost_comment_page_number}}
	return Response(data=ret_data, status= status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, IsVerified, ))
def change(request):
	user = request.user
	if 'password' in request.data and request.data['password'] is not None:
		user.set_password(request.data['password'])
		user.save()
		return Response(data={'password_change_success':True}, status= status.HTTP_200_OK)
	else:
		return Response(data={'password_change_success':False}, status= status.HTTP_400_BAD_REQUEST)

