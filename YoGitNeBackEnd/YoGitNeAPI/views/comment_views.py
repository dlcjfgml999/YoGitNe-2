# Views for comment related operations.

from django.http import HttpResponse, JsonResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from ..permissions import IsRelatedOrReadOnly, IsOwnerOrReadOnly, IsVerified

from ..models import Comment, Found, Lost

from ..serializers.comment_serializer import CommentSerializer

from copy import deepcopy

from ..helpers import author_adder

@api_view(['GET','POST'])
@permission_classes((IsAuthenticated, IsVerified,))
def lost(request, post_id):
    try:
        lost = Lost.objects.get(id=post_id)
    except Lost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        comments = Comment.objects.filter(Q(lost_post_id=post_id) & Q(is_lost_comment=True))
        serializer = CommentSerializer(comments, many=True,\
                    excludings=('is_lost_comment','found_post_id'), context={'request': request})
        ret_data = []
        for comment in serializer.data:
            ret_data.append(author_adder(comment, request.user.username))
        return Response(ret_data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data, excludings=('found_post_id',),\
                                        context={'request': request})
        if serializer.is_valid():
            serializer.save(is_lost_comment=True, lost_post_id=lost, author=request.user)
            # Should is_lost_comment be returned?
            return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class lost_detail(APIView):
    permission_classes = (IsAuthenticated, IsVerified, IsOwnerOrReadOnly)


    def put(self, request, post_id, comment_id, format=None):
        try:
            lost = Lost.objects.get(id=post_id)
            comment = Comment.objects.get(Q(lost_post_id=post_id) \
                                        & Q(is_lost_comment=True) \
                                        & Q(id=comment_id))
        except (Lost.DoesNotExist, Comment.DoesNotExist) as error:
            return Response(status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(self.request, comment)
        data = deepcopy(request.data)
        data['modified_count'] = comment.__dict__['modified_count']+1
        serializer = CommentSerializer(comment, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_200_OK)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes((IsAuthenticated, IsVerified,))

def found(request, post_id):
    try:
        found = Found.objects.get(id=post_id)
    except Found.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        comments = Comment.objects.filter(Q(found_post_id=post_id) & Q(is_lost_comment=False))
        serializer = CommentSerializer(comments, many=True,\
                                excludings=('is_lost_post','lost_post_id'), context={'request': request})
        ret_data = []
        for comment in serializer.data:
            ret_data.append(author_adder(comment, request.user.username))
        return Response(ret_data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(is_lost_comment=False, found_post_id=found, author=request.user)
            return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class found_detail(APIView):
    permission_classes = (IsAuthenticated, IsVerified, IsOwnerOrReadOnly)

    def put(self, request, post_id, comment_id, format=None):
        try:
            found = Found.objects.get(id=post_id)
            comment = Comment.objects.get(Q(found_post_id=post_id) \
                                        & Q(is_lost_comment=False) \
                                        & Q(id=comment_id))
        except (Found.DoesNotExist, Comment.DoesNotExist) as error:
            return Response(status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(self.request, comment)
        data = deepcopy(request.data)
        data['modified_count'] = comment.__dict__['modified_count']+1
        serializer = CommentSerializer(comment, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(author_adder(serializer.data, request.user.username), status=status.HTTP_200_OK)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
