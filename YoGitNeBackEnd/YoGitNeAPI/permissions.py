
from rest_framework import permissions

class IsRelatedOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj): # assume that obj is an object of Found
        if request.method == 'GET':
            return True
        if request.method == 'PUT':
            if obj.author.username == request.user.username:
                return True
            else:
                for checker in obj.who_checked_post.all():
                    if checker.who.username == request.user.username:
                        return True
                
            return False

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj): # assume that obj is an object of Lost
        if request.method == 'GET':
            return True
        if request.method == 'PUT':
            return obj.author.username == request.user.username


class IsVerified(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.mySNU_verified

