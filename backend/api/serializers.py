from rest_framework import serializers
from .models import University, Profile, StudyGroup
from django.contrib.auth.models import User


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name', 'abbreviation']


class ProfileSerializer(serializers.ModelSerializer):
    # This shows the university's abbreviation (e.g., "TUM")
    # instead of just its ID number.
    university = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'university']


class UserSerializer(serializers.ModelSerializer):
    # 'profile' is the 'related_name' we set on the User model
    # via the Profile's OneToOneField. We're nesting a serializer.
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']


class StudyGroupSerializer(serializers.ModelSerializer):
    # We use StringRelatedField to show the university's
    # abbreviation (e.g., "TUM") instead of just its ID.
    university = serializers.StringRelatedField(read_only=True)

    # We use UserSerializer to show nested details about
    # the group's creator, not just their ID.
    creator = UserSerializer(read_only=True)

    # We show how many members are in the group. This is
    # a read-only field we define ourselves.
    members_count = serializers.SerializerMethodField()

    class Meta:
        model = StudyGroup
        fields = [
            'id', 'title', 'course_code', 'description', 
            'location', 'meeting_time', 'university', 'creator', 
            'members', 'members_count'
        ]
        
    def get_members_count(self, obj):
        # 'obj' is the StudyGroup instance.
        # We count the number of members in its 'members' field.
        return obj.members.count()