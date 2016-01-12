import datetime
import time
import requests
import json
import math
import pandas as pd
from glob import glob
from multiprocessing import Pool
from pdb import set_trace as trace
from usersConfig import *

def user_details(args):
    user, clientid,clientsecret = args
    for failure_count in range(0,4):
        link = 'https://api.github.com/users/'+str(user)+'?client_id='+clientid+'&client_secret='+clientsecret
        try:
            r = requests.get(link) #settimeout
            if(r.ok and r.text!='[]'):
                repoItem = json.loads(r.text or r.content)
    
                if repoItem['login']:
                    try:
                        user_id =  repoItem['id']
                    except:
                        user_id =  -1
                    login =  repoItem['login']
                    try:
                        user_type =  repoItem['type']
                    except:
                        user_type = ''
                    site_admin =  (1 if repoItem['site_admin'] is True else 0)
                    try:
                        name =  repoItem['name'].encode('utf-8').replace(',',' ')
                    except:
                        name = ''
                    try:
                        company =  repoItem['company'].encode('utf-8').replace(',',' ')
                    except:
                        company = ''
                    try:
                        blog =  repoItem['blog'].encode('utf-8').replace(',',' ')
                    except:
                        blog = ''
                    try:
                        location =  repoItem['location'].encode('utf-8').replace(',',' ')
                    except:
                        location = ''
                    try:
                        email =  repoItem['email'].encode('utf-8').replace(',',' ')
                    except:
                        email = ''
                    try:
                        hireable =  (1 if repoItem['hireable'] is True else 0)
                    except:
                        hireable = -1
                    try:
                        bio = repoItem['bio'].encode('utf-8').replace(',',' ')
                    except:
                        bio = ''
                    try:
                        public_repos =  repoItem['public_repos']
                    except:
                        public_repos = -1
                    try:
                        public_gists =  repoItem['public_gists']
                    except:
                        public_gists = -1
                    try:
                        followers =  repoItem['followers']
                    except:
                        followers = -1
                    try:
                        following =  repoItem['following']
                    except:
                        following = -1
                    try:
                        created_at =  repoItem['created_at']
                    except:
                        created_at = ''
                    try:
                        updated_at =  repoItem['updated_at']
                    except:
                        updated_at= ''

                    return ", ".join([str(user_id),str(login),str(user_type),str(site_admin),str(name),str(company),str(blog),str(location),str(email),str(hireable),str(bio),str(public_repos),str(public_gists),str(followers),str(following),str(created_at),str(updated_at)])
                else:
                    return ", ".join(['',str(user),'','','','','','','','','','','','','','',''])
            else:
                return ", ".join(['',str(user),'','','','','','','','','','','','','','',''])
        except Exception, err:
            if failure_count >=0:
                return ", ".join(['',str(user),'','','','','','','','','','','','','','',''])
            else:
                continue

def get_user_details():
    total_requests = 5000
    requests_per_resource = 1
    calls_per_token  = int(total_requests/requests_per_resource)
    
    user_level1 = pd.read_csv(DATA_LOCATION + "Users_Level1.csv")
    #user_level1 = user_level1[9300000:]  ##Change
    
    user_level2 = pd.DataFrame()
    for files in glob(DATA_LOCATION + "Users_Level2_*.csv"):
	print files
        file_temp = pd.read_csv(files, usecols=['login'])  ##usecols to read only one column
        user_level2 = user_level2.append(file_temp)
	file_temp = pd.DataFrame()
	time.sleep(200)
    user_level2 = user_level2.drop_duplicates()
    repo_full_name = user_level1[~(user_level1['login'].isin(user_level2['login']))]['login'].values.tolist()
    '''
    if DATA_LOCATION+"Users_Level2.csv" in glob(DATA_LOCATION+"*.csv"):
        user_level2 = pd.read_csv(DATA_LOCATION+"Users_Level2.csv")
        repo_full_name = user_level1[~(user_level1['login'].isin(user_level2['login']))]['login'].values.tolist()
    else:
        repo_full_name = user_level1['login'].values.tolist()   ##change
    '''
    tokens = pd.read_csv(MISC_DATA_LOCATION + "githup_api_tokens_40.csv")  ##Read the tokens from file.
    clientid = tokens[4:5]['Client ID'].values.tolist()
    clientsecret = tokens[4:5]['Client Secret'].values.tolist()
    num_tokens = len(clientid)
    
    step = 500
    l1, l2 = 0, step
    print "Total number of pages : ", len(repo_full_name)

    start = datetime.datetime.now()
    print "Start time is: ",start
    for i in range(int(math.ceil(float(len(repo_full_name))/step))):
        if l2 > len(repo_full_name):
            l2 = len(repo_full_name)
        print l1, l2
        all_users = pd.DataFrame()
        lis = repo_full_name[l1:l2]
        args = [(li, clientid[0], clientsecret[0]) for li in lis]
        p = Pool(processes=5)
        q0 = p.map(user_details, args)
        p.close()
        p.join()
        api_output = ";".join(q0)
        api_output = api_output.split(';')
        api_output = [i.replace('(','').replace(')','').replace("'","").split(', ') for i in api_output]
        all_users = all_users.append(api_output)
        l1, l2 = l2, l2+step
        
        if DATA_LOCATION + "Users_Level2_"+ start.strftime('%Y') +".csv" not in glob(DATA_LOCATION+"*.csv"):
            all_users.columns = ['user_id','login','user_type','site_admin','name','company','blog','location','email','hireable','bio','public_repos','public_gists','followers','following','created_at','updated_at']
            write_file = open(DATA_LOCATION + "Users_Level2_"+ start.strftime('%Y') +".csv", "a")
            all_users.to_csv(write_file, index=False)
        else:
            write_file = open(DATA_LOCATION + "Users_Level2_"+ start.strftime('%Y') +".csv", "a")
            all_users.to_csv(write_file, index=False, header=False)
        write_file.close()
    
        if (l1 % (num_tokens * calls_per_token) == 0): ##Sleeping condition
            end = datetime.datetime.now()
            print "End time is: ",end
            time_spent = (end-start).total_seconds()
            if time_spent < 3600:
                print "Time spent: ", time_spent
                print "Waiting for the reset of the tokens....\n"
                time.sleep(3660 - time_spent)
            else:
                print "Tokens already reset.........\n"
            start = datetime.datetime.now()
            print "Start time is: ",start
             
    end = datetime.datetime.now()
    print "End time is: ",end    
    print "Total time taken: ", (end-start).total_seconds()        
    return True

if __name__ == '__main__':
    print get_user_details()
