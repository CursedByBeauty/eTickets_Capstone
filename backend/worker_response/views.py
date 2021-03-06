from authentication.models import User
from authentication.serializers import UserSerializer
from .models import WorkerResponse
from .serializers import WorkerResponseSerializer
from modulefinder import IMPORT_NAME
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_all_responses(request):

    if request.method == 'GET':
        # GETS ALL THE RESPONSES IN THE TABLE FOR THE CURRENT MAINTENANCE WORKER LOGGED IN
        maintenance = WorkerResponse.objects.filter(worker__role = request.user.role)
        resident = WorkerResponse.objects.filter(workorder__resident_id = request.user.id)
        management = WorkerResponse.objects.filter(management__id = request.user.id)
        if maintenance: 
            serializer = WorkerResponseSerializer(maintenance, many = True)
            return Response(serializer.data, status.HTTP_200_OK)
        elif resident:
            serializer = WorkerResponseSerializer(resident, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        elif management:
            serializer = WorkerResponseSerializer(management, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response([],status = status.HTTP_200_OK)
        

    elif request.method == 'POST':
        # MAINTENANCE FEATURE TO ADD A NEW RESPONSE
        serializer = WorkerResponseSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def response_details(request, pk):
    response = get_object_or_404(WorkerResponse, pk=pk)
    if request.method == 'GET':
        serializer = WorkerResponseSerializer(response)
        return Response(serializer.data, status.HTTP_200_OK)
    elif request.method == 'PUT': 
        serializer = WorkerResponseSerializer(response, data=request.data)
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
            return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request): 
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)