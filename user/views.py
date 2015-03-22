import json

from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import Account
from user.permission import IsAccountOwner
from user.serializer import AccountSerializer
from django.contrib.auth import authenticate, login, logout



# Create your views here.

# @api_view(['GET'])
# def user(request):
#     serializer = MyUserSerializer(request.user.myuser)
#     return Response(serializer.data)

def my_account(request):
    return render(request, 'user/user.html')

class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated, IsAccountOwner(),)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = json.loads(request.body)

    username = data.get('username', None)
    password = data.get('password', None)

    account = authenticate(username=username, password=password)

    if account is not None:
        if account.is_active:
            login(request, account)

            serialized = AccountSerializer(account)

            return Response(serialized.data)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'This account hs been disabled.'
            }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({
            'status': 'Unauthorized',
            'message': 'Username/password combination invalid.'
        }, status=status.HTTP_401_UNAUTHORIZED)