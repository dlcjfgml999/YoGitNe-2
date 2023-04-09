from .models import MyUser, Who_checked, Found, Lost, Comment
from copy import deepcopy
from PIL import Image
from django.db.models import Q


def comment_count_adder(post, is_lost_comment):
	post = deepcopy(post)
	if is_lost_comment:
		cnt = Comment.objects.filter(Q(is_lost_comment=True) & Q(lost_post_id=post['id'])).count()
	else:
		cnt = Comment.objects.filter(Q(is_lost_comment=False) & Q(found_post_id=post['id'])).count()
	post['comment_count'] = cnt
	return post
###################################################################
def imageResizer(data):
	data = deepcopy(data)
	# if 'image' in data:
	# 	try:
	# 		im = Image.open(StringIO(data['image'].read()))
	# 		im = im.resize((800, 600), Image.ANTIALIAS)
	# 		data['image'] = im
	# 	except IOError:
	# 		return Response({'msg': 'Bad image.'}, status.HTTP_400_BAD_REQUEST)
	return data
######################################################################

def censor_name(name, requesting_username):
	if name == requesting_username : 
		return name
	else :
		return name[:3]+'****'


## Functions for author name adder ###############################################
def id_to_name(id, requesting_username):
	try:
		user = MyUser.objects.get(id=id)
	except MyUser.DoesNotExist:
		return Response(data={'details':'id_to_name user not found'}, \
			status=status.HTTP_404_NOT_FOUND)
	return censor_name(user.username, requesting_username)

def dict_adder(dict, field_name, data):
	new_dict = deepcopy(dict)
	new_dict[field_name] = data
	return new_dict

# No need to censor requesting username
def author_adder(dict, requesting_username):
	return dict_adder(dict, 'username', id_to_name(dict['author'], requesting_username))

#######################################################################################


######################################################################################
# Returns checker information.
# List of (username, checked_date) pairs.
def get_checkers(post_id, requesting_username):
	checkings = Who_checked.objects.filter(post__id=post_id)
	return [(censor_name(check.who.username, requesting_username), check.checked_date) for check in checkings]


def checker_adder(dict, requesting_username):
	checkers = get_checkers(dict['id'], requesting_username)
	ret_data = deepcopy(dict)
	ret_data['checkers'] = checkers
	return ret_data
########################################################################################