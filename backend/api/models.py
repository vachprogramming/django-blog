# studyconnect/backend/api/models.py

from django.db import models
# We import the built-in User model from Django's authentication system.
# This model already handles usernames, emails, passwords, etc.
from django.contrib.auth.models import User
# We import signals to be able to "listen" for when a new User is created.
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- Model 1: University ---
# This model will store the universities (TUM, LMU, etc.)
class University(models.Model):
    """
    Represents a university.
    """
    # max_length is required.
    # unique=True ensures no two universities can have the same name.
    name = models.CharField(max_length=255, unique=True)
    
    # We allow the abbreviation (e.g., "TUM") to be shorter
    # and also require it to be unique.
    abbreviation = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name # e.g., "Technical University of Munich"

# --- Model 2: Profile 
# This model "extends" the built-in User model.
# It links a User to their University.
class Profile(models.Model):
    """
    Represents a user's profile, linking them to their university.
    """
    # OneToOneField creates a strict 1-to-1 link. One user
    # can have exactly one profile, and one profile can
    # belong to exactly one user.
    # on_delete=models.CASCADE means: "If the User is deleted,
    # delete their Profile too." This is good for data integrity.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # ForeignKey creates a many-to-one link. Many profiles
    # can be linked to the *same* one university.
    # on_delete=models.SET_NULL means: "If the University is deleted,
    # don't delete the profile, just set this field to 'null'."
    # We must also set 'null=True' and 'blank=True' to allow this.
    university = models.ForeignKey(
        University, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )

    def __str__(self):
        # This will show "admin's Profile" in the admin panel
        return f"{self.user.username}'s Profile"


# automatically creating a Profile *every time* a new User is created.
# A "signal" is a way to run code when a specific event happens.

# @receiver(post_save, sender=User)
# This "decorator" line registers our function. It says:
# "After a User object is saved (post_save), run this function."
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Signal handler to create a Profile when a new User is created.
    """
    # 'created' will be True only the first time the User is saved
    if created:
        Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     """
#     Signal handler to save the Profile when the User is saved.
#     """
#     # This ensures that any changes to the User also
#     # trigger a save for the associated Profile.
#     instance.profile.save()

# --- Model 3: StudyGroup ---
# This is the main model for our application.
class StudyGroup(models.Model):
    """
    Represents a study group created by a user.
    """
    # A text field for the group's title
    title = models.CharField(max_length=255)
    
    # A smaller text field for the course code (e.g., "IN0007")
    course_code = models.CharField(max_length=30, blank=True)
    
    # TextField is for longer-form text, like a paragraph.
    description = models.TextField(blank=True)
    
    # A simple text field for location
    location = models.CharField(max_length=255, blank=True)
    
    # DateTimeField stores both a date and a time.
    # 'null=True' and 'blank=True' make this field optional.
    meeting_time = models.DateTimeField(null=True, blank=True)
    
    # This links the group to the university it belongs to.
    # If a University is deleted, all its groups are also deleted (CASCADE).
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    
    # This links the group to the user who created it.
    # 'related_name="created_groups"' lets us easily find all
    # groups a user has created (e.g., user.created_groups.all())
    creator = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="created_groups"
    )
    
    # ManyToManyField creates a many-to-many link.
    # One user can be a member of many groups.
    # One group can have many members.
    # 'related_name="joined_groups"' lets us find all
    members = models.ManyToManyField(
        User, 
        related_name="joined_groups", 
        blank=True
    )
    
    def __str__(self):
        # e.g., "IN0007 Prep (TUM)"
        return f"{self.title} ({self.university.abbreviation})"