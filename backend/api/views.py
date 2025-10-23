from rest_framework import viewsets, permissions
from .models import University, Profile, StudyGroup
from django.contrib.auth.models import User
from .serializers import (
    UniversitySerializer,
    ProfileSerializer,
    UserSerializer,
    StudyGroupSerializer
)

class UniversityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows universities to be viewed or edited.
    """
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows profiles to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class StudyGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows study groups to be viewed or edited.
    """
    queryset = StudyGroup.objects.all().order_by('-meeting_time')
    serializer_class = StudyGroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # When a new group is created, set the creator
        # to the currently logged-in user.
        serializer.save(creator=self.request.user)
