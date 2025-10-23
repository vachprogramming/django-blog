from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        """
        This method is run when the app is loaded.
        We import our signals file here to make sure
        the signal handlers are registered.
        """
        # We import from models.py where we defined our signals
        from . import models