from rest_framework import serializers
from holiday.models import Holiday, Admin, Cities

#Holiday serializer with id, cityname , date and holidayname
#Name ----> HolidaySerializer

class HolidaySerializer(serializers.ModelSerializer):
  date = serializers.DateField(format="%d/%m/%Y")
  class Meta:
    model = Holiday
    fields = ['id', 'city_name', 'date', 'holidayName']
	
#holidaylistserializer with cityname, date and holidayname
#Name ----->HolidayListSerializer
class HolidayListSerializer(serializers.ModelSerializer):
  date = serializers.DateField(format="%d/%m/%Y")
  class Meta:
    model = Holiday
    fields = ['city_name', 'date', 'holidayName']
	
#uploadserializer with a field --> file which is not present in the holiday model
#Name---->UploadSerializer
	
#citylistserializer with cityname 
#Name ----->CityListSerializer
class CitiesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cities
    fields = ['cityName']    	
#monthserializer with fields cityname and year, month which are not present in the model
#Name -----> MonthSerializer
class MonthSerializer(serializers.ModelSerializer):
  date = serializers.DateField(format='%d/%m/%Y')
  class Meta:
    model = Holiday
    fields = [ 'date','id', 'holidayName']
class DailySerializer(serializers.ModelSerializer):
  date = serializers.DateField(format="%d/%m/%Y")
  class Meta:
    model = Holiday
    fields = ['holidayName', 'id', 'date']      	
#dailyserializer with date field
#Name -----> DailySerializer

class AdminSerializer(serializers.ModelSerializer):
  class Meta:
    model = Admin
    fields = [ 'admin_email','password'] 	
#adminloginserializer with adminemail and password
#Name -----> AdminLoginSerializer
	