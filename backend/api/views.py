from rest_framework import viewsets, permissions
from .models import University, Profile, StudyGroup
from django.contrib.auth.models import User
from .serializers import (
    UniversitySerializer,
    ProfileSerializer,
    UserSerializer,
    StudyGroupSerializer
)

from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer 

class RegisterView(APIView):
    """
    A simple, custom API endpoint for creating a new user.
    """
    # 'permission_classes' set to 'AllowAny' means
    # any user (even unauthenticated) can access this endpoint.
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Get the data from the request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        # --- 1. Simple Validation ---
        if not all([username, email, password, password2]):
            return Response(
                {"error": "All fields are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != password2:
            return Response(
                {"error": "Passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # --- 2. Check for existing user ---
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # --- 3. Create the User ---
        # We use 'create_user' to ensure the password
        # is properly hashed (secured).
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

            # We can return the new user's data
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Catch any other unexpected errors
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class LoginView(APIView):
    """
    A simple, custom API endpoint for user login.
    Returns an auth token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # We'll try to get 'email' first, but fall back to 'username'
        # This makes our endpoint more flexible
        identifier = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')

        if not identifier or not password:
            return Response(
                {"error": "Please provide both email/username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # We need to find the user by email
        try:
            # Find the user by their email
            user_by_email = User.objects.get(email=identifier)
            # Then get their actual username
            username = user_by_email.username
        except User.DoesNotExist:
            # If not found by email, maybe they sent their username
            username = identifier

        # 'authenticate' is Django's built-in way to check
        # a username and password.
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Login was successful
            # 'get_or_create' finds the user's token,
            # or creates a new one if it doesn't exist.
            token, created = Token.objects.get_or_create(user=user)

            return Response(
                # We send back the token "key"
                {"token": token.key},
                status=status.HTTP_200_OK
            )
        else:
            # Login failed
            return Response(
                {"error": "Invalid Credentials. Please try again."},
                status=status.HTTP_400_BAD_REQUEST
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
