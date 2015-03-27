from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username.')

        if not kwargs.get('email'):
            raise ValueError('Users must have a valid email')

        account = self.model(
            email=self.normalize_email(kwargs.get('email')), username=username
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_user(username, password, **kwargs)

        account.is_admin = True
        account.save()

        return account

class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)

    first_name = models.CharField(max_length=20, blank=True)
    last_name = models.CharField(max_length=20, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

# class Expect(models.Model):
#     category = models.ManyToManyField(Category)
#     lower = models.DecimalField(max_digits=8, decimal_places=2) # maximum == 999,999.99
#     upper = models.DecimalField(max_digits=8, decimal_places=2)
#     user = models.ForeignKey(MyUser)
#     tag = models.ManyToManyField(Tag)                           # other tags that are not primary
#
#     def __str__(self):
#         return '%s expects %s' % (self.user, self.category)
