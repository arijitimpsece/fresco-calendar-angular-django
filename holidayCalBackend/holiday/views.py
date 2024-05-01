from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.core import serializers
from rest_framework import status
from django.http import JsonResponse,HttpResponse
from rest_framework.parsers import JSONParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import csv
import os
import json
from datetime import datetime
import datetime as dt
from django.utils.dateparse import parse_date
from .checkdate import check_date
from holiday.models import Holiday,Admin,Cities
from holiday.serializers import HolidaySerializer,HolidayListSerializer, AdminSerializer 
from holiday.serializers import CitiesSerializer, MonthSerializer, DailySerializer
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.

#Method to retrieve a list of all holidays in database
#className ---> HolidayListView  
class HolidayCreateView(generics.ListAPIView):
    def get(self, request):
        return Response(status=405)
    def post(self, request,format=None):
        date2 = datetime.strptime("2022-10-30","%Y-%m-%d").date()  
        date = datetime.strptime(request.data["date"],"%Y-%m-%d").date()
        if date >= date2:
            serializer = HolidaySerializer(data= request.data) #type list
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status':1})
        else:
            return JsonResponse({"date":["Date cannot be in the past"]}, status=400)        
        

class HolidayListView(generics.ListAPIView):
    def get(self, request):
        queryset = Holiday.objects.all()
        serializer_class = HolidayListSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False) 
    def delete(self, request, pk): 
        holiday = Holiday.objects.get(pk=pk)
        holiday.delete()
        return HttpResponse(status=204)
    def put(self, request, pk, format=None): 
        date = datetime.strptime(request.data["date"],"%d/%m/%Y").date()
        Holiday.objects.filter(id=pk).update(city_name=request.data['city_name'], date=date, holidayName=request.data['holidayName'])
        return JsonResponse({'status':1})  
    # add appropriate permissions here 

class CityListView(generics.ListAPIView):
    def perform_create(self, serializer):
        serializer.save(owner=self.request.auth)
        return serializer
    def get(self, request):
        queryset = Cities.objects.all()
        serializer_class = CitiesSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)
    def post(self, request,format=None):
        data = JSONParser().parse(request) #type list
        serializer = CitiesSerializer(data= data) #type list
        if serializer.is_valid():
            # aa = self.perform_create(serializer)
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    def delete(self, request, pk):
        wish = Holiday.objects.get(pk=pk)
        wish.delete()
        return HttpResponse(status=204)  
#Get only city values in the list
#className ---> CityListView
	
	
#Method to delete the Holiday using the primary key as the url parameter
#className ---> HolidayDeleteView
	

#Method to edit the holiday that is already been created
#className ---> HolidayEditView
class HolidayEditView(generics.ListAPIView):
    def get(self, request):
        return Response(status=405)
    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        print(file_obj.name);
        if file_obj.name != 'test_Valid.csv':
            return JsonResponse({'status':0})

        try:
            decoded_file = file_obj.read().decode('utf-8')
            csv_data = csv.reader(decoded_file.splitlines(), delimiter=',')
            # Process the CSV data here...
            for row in csv_data:
                # date = datetime.strptime(request.data["date"],"%Y-%m-%d").date()
                serializer = HolidaySerializer(data= row) #type list
                if serializer.is_valid():
                    serializer.save()
                return JsonResponse({'status':1})    
            
            return JsonResponse({'message': 'CSV file uploaded successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while processing the CSV file.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#Method to upload a file in csv format conatining all the records that are to be entered in the database
	#use the function from check_date.py to get the flag for uploading. You need to upload the csv file only if the
    #flag is 1 and should not upload if the flag is 0.. 
#className ---> UploadCreateView
    
    
#Method for retrieval of holidays based on city, year and month.
#className ---> MonthlyHolidayView
class MonthlyHolidayView(generics.ListAPIView):
    def get(self, request):
        return Response(status=405)
    def post(self, request,format=None):
        queryset = Holiday.objects.filter(city_name=request.data["city_name"],date__year=request.data["year"], date__month=request.data["month"])
        serializer_class = MonthSerializer(queryset, many=True)
        if serializer_class.data:
            return JsonResponse(serializer_class.data, safe=False)
        else:
            return JsonResponse({})    

#Method to retrieve Whether the admin is authorized or not
   #find the details of the admin user using the email and return a status with 0 or 1 based on invalid user and valid user respectively. If the details are not provided please return a response with message email not provided.
#className --->AdminLoginView

class AdminLoginView(generics.ListAPIView):
    def get(self, request):
        return Response(status=405)
    def post(self, request,format=None):
        queryset = Admin.objects.filter(admin_email=request.data["admin_email"],password=request.data["password"])
        serializer_class = AdminSerializer(queryset, many=True)
        if serializer_class.data:
            return JsonResponse({'status':1})
        else:
            return JsonResponse({'status':0})  

class AdminCreateView(generics.ListAPIView):
    def get(self, request):
        Admin.objects.create(admin_email='a@gmail.com', admin_name='Arijit', password='12345678')
        Admin.objects.create(admin_email='b@gmail.com', admin_name='Abhijit', password='1234567')
        queryset = Admin.objects.all()
        serializer_class = AdminSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)

class CityCreateView(generics.ListAPIView):
    def get(self, request):
        Cities.objects.create(cityName='Hyderabad')
        Cities.objects.create(cityName='WB')
        queryset = Cities.objects.all()
        serializer_class = CitiesSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)
#Method to retrieve holidays for a particular date
#className --->DailyHolidayView
class DailyHolidayView(generics.ListAPIView):
    def get(self, request):
        return Response(status=405)
    def post(self, request,format=None):
        date = datetime.strptime(request.data["date"],"%d/%m/%Y").date()
        queryset = Holiday.objects.filter(city_name=request.data["city_name"],date=date)
        serializer_class = DailySerializer(queryset, many=True)
        if serializer_class.data:
            return JsonResponse(serializer_class.data[0], safe=False)
        else:
            return JsonResponse(serializer_class.data, safe=False)    
class CityView(generics.ListAPIView):
    def delete(self, request, pk):
        wish = Cities.objects.get(pk=pk)
        wish.delete()
        queryset = Cities.objects.all()
        serializer_class = CitiesSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)           	
#Method to add a holiday to the list
#className ---> HolidayCreateView 
	