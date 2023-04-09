from rest_framework import serializers
from YoGitNeAPI.models import MyUser


class MyUserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        
        instance.save()
        return instance

    class Meta:
        model = MyUser
        fields = ('id', 'username', 'password', 'mySNU_verified', 'mySNU_verification_token')


