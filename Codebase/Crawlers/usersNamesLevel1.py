import datetime
import time
import requests
import json
import math
import traceback
import pandas as pd
from glob import glob
import os
from multiprocessing import Pool
from pdb import set_trace as trace
from usersConfig import *

def loginnames(args):
    id_counter,clientid,clientsecret = args
    link = 'https://api.github.com/users?since='+str(id_counter)+'&per_page=100&client_id='+clientid+'&client_secret='+clientsecret
    for i in range(0,4):
        try:
            r = requests.get(link) #settimeout
            if(r.ok):
                item = json.loads(r.text or r.content)
                if not item:
                    return "[ ]"

                temp_list = []
                for repoItem in item:
                    user_id =  repoItem['id']
                    login =  repoItem['login']
                    
                    temp_list.append((
                        user_id,str(login)
                        ))
                q1 = (";".join([str(i) for i in temp_list]))
                return str(q1)
            else:
                return ", ".join(['', ''])
        except Exception, err:
            if i>=0:
                return ", ".join(['', ''])
            else:
                continue

def get_all_loginnames():
    total_requests = 5000
    requests_per_resource = 1
    calls_per_token  = int(total_requests/requests_per_resource)

    if DATA_LOCATION + "Users_Level1.csv" in glob(DATA_LOCATION + "*.csv"):
        user_level1 = pd.read_csv(DATA_LOCATION + "Users_Level1.csv")
        last_user_id = user_level1['user_id'].max()
        print "last User id is: ",last_user_id
    else:
        last_user_id = 0
    
    tokens = pd.read_csv(MISC_DATA_LOCATION + "githup_api_tokens_40.csv")  ##Read the tokens from file.
    clientid = tokens[4:5]['Client ID'].values.tolist()
    clientsecret = tokens[4:5]['Client Secret'].values.tolist()
    num_tokens = len(clientid)

    start = datetime.datetime.now()
    print "Start time is: ",start
    
    request_count = 0
    while True:
        all_users = pd.DataFrame()
        args = (int(last_user_id), clientid[0], clientsecret[0])
        q0 = loginnames(args)
        if q0 == "[ ]":
            break
        api_output = q0.split(';')
        api_output = [i.replace('(','').replace(')','').replace("'","").split(', ') for i in api_output]
        all_users = all_users.append(api_output)
        last_user_id = all_users[0].max()
        request_count =  request_count + 1
        
        all_users.columns = ['user_id','login']
        
        if DATA_LOCATION + "Users_Level1.csv" not in glob(DATA_LOCATION + "*.csv"):
            write_file = open(DATA_LOCATION + "Users_Level1.csv", "a")
            all_users.to_csv(write_file, index=False)
        else:
            write_file = open(DATA_LOCATION + "Users_Level1.csv", "a")
            all_users.to_csv(write_file, index=False, header=False)
        write_file.close()
        
        if (request_count % (num_tokens * calls_per_token) == 0):  ##Sleeping condition
            end = datetime.datetime.now()
            print "End time is: ",end
            time_spent = (end-start).total_seconds()
            if time_spent < 3600:
                print "Time spent: ", time_spent
                print "Waiting for the reset of the tokens...."
                time.sleep(3660 - time_spent)
            else:
                print "Tokens already reset........."
            start = datetime.datetime.now()
            print "Start time is: ",start
    end = datetime.datetime.now()
    print "End time is: ",end   
    print "Total time taken: ", (end-start).total_seconds()         
    return True

if __name__ == '__main__':
    print get_all_loginnames()
    time.sleep(3600)
