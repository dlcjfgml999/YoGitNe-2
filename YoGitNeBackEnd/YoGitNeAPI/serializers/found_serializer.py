from rest_framework import serializers
from YoGitNeAPI.models import Found

class FoundSerializer(serializers.ModelSerializer):
	# This is for dynamical field choosing.
	# Usage : When creating serializer, pass fields argument 
	# with specific fields that needs to only be handeled, or needs to be excluded.
	# Example : 
	# FoundSerializer(found) handles all fields.
	# FoundSerializer(found, fields=('id',)) handles only id
	# FoundSerializer(found, excludings=('how_to_contact',)) excludes how_to_contact

        
	def __init__(self, *args, ** kwargs):
		fields = kwargs.pop('fields', None)
		excludings = kwargs.pop('excludings', None)
		super(FoundSerializer, self).__init__(*args, **kwargs)
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

	image = serializers.ImageField(use_url=True, allow_empty_file=True, required=False)
	isAuthor = serializers.SerializerMethodField()

	def get_isAuthor(self, obj):
		return self.context['request'].user == obj.author

	class Meta:
		model = Found
		fields = '__all__'
		# There are several read-only fields. Be aware of that.
		'''read_only_fields = (
			'author',
			'create_date', 'modified_date', 'modified_count',
			'how_to_contact',
			'latitude', 'longitude',
			# This two should be changed only once,
			# depending on case_closed
			#'case_closed', 'case_closed_by_whom', 'case_closed_date'
		)'''
		read_only_fields = ('author', 'create_date', 'modified_date',)