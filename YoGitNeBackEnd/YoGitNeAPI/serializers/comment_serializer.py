from rest_framework import serializers
from YoGitNeAPI.models import Comment

class CommentSerializer(serializers.ModelSerializer):
	# This is for dynamical field choosing.
	# Usage : When creating serializer, pass fields argument 
	# with specific fields that needs to only be handeled, or needs to be excluded.
	# Example : 
	# CommentSerializer(comment) handles all fields.
	# CommentSerializer(comment, fields=('id',)) handles only id
	# CommentSerializer(comment, excludings=('how_to_contact',)) excludes how_to_contact
	def __init__(self, *args, ** kwargs):
		fields = kwargs.pop('fields', None)
		excludings = kwargs.pop('excludings', None)
		super(CommentSerializer, self).__init__(*args, **kwargs)
		if fields is not None:
			allowed = set(fields)
			existing = set(self.fields)
			for field_name in existing - allowed:
				self.fields.pop(field_name)
		if excludings is not None:
			not_allowed = set(excludings)
			existing = set(self.fields)
			for field_name in not_allowed & existing:
				self.fields.pop(field_name)

	isAuthor = serializers.SerializerMethodField()

	def get_isAuthor(self, obj):
		return self.context['request'].user == obj.author

	class Meta:
		model = Comment
		fields = '__all__'
		# There are several read-only fields. Be aware of that.
		#read_only_fields = ('author', 'create_date', 'modified_date', 'modified_cound',)
		'''read_only_fields = (
			'author',
			'create_date', 'modified_date', 'modified_count',
			'is_lost_comment',
			'lost_post_id', 'found_post_id',
		)'''
		read_only_fields = ('author', 'create_date', \
						'modified_date', \
						'is_lost_comment',\
						'lost_post_id', 'found_post_id',)

