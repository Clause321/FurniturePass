from uuid import uuid4
__author__ = 'renl'
import os


def datetime_format_helper(input_date_time):
    date_time_list = input_date_time.split(" ")
    date = date_time_list[0]
    time = date_time_list[1]
    day_year_month_list = date.split("/")
    day = day_year_month_list[0]
    month = day_year_month_list[1]
    year = day_year_month_list[2]
    return year + "-" + month + "-" + day + " " + time

'''
this function is to change upload path
'''

def upload_helper(instance, filename):
    ext = filename.split('.')[-1]
    f = filename.split('.')[0]
    if instance.pk:
        filename = '{}.{}'.format(f, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join('path', filename)