import datetime
import time
import requests
import json
import math
from multiprocessing import Pool
from pdb import set_trace as trace
import os
import pandas as pd
from glob import glob
from lxml import html
import re
import MySQLdb
import traceback
from sqlalchemy import create_engine
import csv
import itertools
import collections
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tag import pos_tag
import numpy as np
from collections import Counter
from operator import itemgetter
import copy
from processorConfig import *
from pdb import set_trace as trace

def storeTfidf():
    """
    This method stores the TFIDF analysis of readme files of cisco-users owned repositories.
    """
    connection = engine.connect()
    connection.execute("truncate table cisco_tfidf")
    connection.close()
    q0 = "INSERT INTO cisco_tfidf (text, uniqueness, reach ,row_inserted_on) VALUES "
    users = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "cisco_tfidf.csv")
    users = users[['noun','frequency','tfidf-score']]
    users['row_inserted_on'] = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    users = users.fillna('')
    users = users.astype(str)
    temp_list = users.values.tolist()
    q1 = (", ".join(str(i).replace('(',' ').replace(')',' ').replace("%", " ").replace('"', " ").replace('\\', " ") for i in temp_list)).replace('[','(').replace(']',')')
    sql = q0 + q1
    connection = engine.connect()
    connection.execute(sql)
    connection.close()

def storeTimelineInfo():
    """
    This method stores the timeline information for all the cisco users.
    """
    connection = engine.connect()
    connection.execute("truncate table cisco_user_timeline")
    connection.close()
    q0 = "INSERT INTO cisco_user_timeline (actor_login,created_at,event,event_action,event_closed_at,event_created_at,event_number,repository_name,repository_owner,user_type,row_inserted_on) VALUES "
    users = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "ciscoUserTimelineByActorLogin.csv")
    users['row_inserted_on'] = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    users = users.fillna('')
    users = users.astype(str)
    temp_list = users.values.tolist()
    for i in temp_list:
        q1 = str(i).replace('(',' ').replace(')',' ').replace("%", " ").replace('"', " ").replace('\\', " ").replace('[','(').replace(']',')')
        sql = q0 + q1
        connection = engine.connect()
        connection.execute(sql)
        connection.close()

def storeCiscoUserList():
    """
    This method stores the users identified as cisco-users.
    """
    connection = engine.connect()
    connection.execute("truncate table cisco_user_list")
    connection.close()
    q0 = "INSERT INTO cisco_user_list (user_id,login,user_type,site_admin,name,company,blog,location,email,hireable,bio,public_repos,public_gists,followers,following,created_at,updated_at,row_inserted_on) VALUES "
    users = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "cisco_user_list.csv")
    users = users.drop_duplicates(subset=['login'], take_last=True)
    users['row_inserted_on'] = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    users['blog'] = users['blog'].str.replace('[',' ').replace(']',' ')
    users['bio'] = users['bio'].str.replace('[',' ').replace(']',' ')
    users['company'] = users['company'].str.replace('[',' ').replace(']',' ')
    users['location'] = users['location'].str.replace('[',' ').replace(']',' ')            
    users = users.fillna('')
    users = users.astype(str)
    users = users[users['user_id']!='']
    temp_list = users.values.tolist()
    q1 = (", ".join(str(i).replace('(',' ').replace(')',' ').replace("%", " ").replace('"', " ").replace('\\', " ") for i in temp_list)).replace('[','(').replace(']',')')
    sql = q0 + q1
    connection = engine.connect()
    connection.execute(sql)
    connection.close()
    

def storeRepositoryInfo():
    """
    This method stores the repository details of cisco users.
    """
    connection = engine.connect()
    connection.execute("truncate table repository_info")
    connection.close()
    q0 = """INSERT INTO repository_info  (login,repo_id,name,full_name,is_private,description,is_fork,created_at,updated_at,pushed_at,homepage,size,watchers_count,language,has_issues,has_downloads,has_wiki,has_pages,forks_count, open_issues,default_branch,row_inserted_on) VALUES """
    crepo = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "repository_info.csv")
    crepo = crepo.drop_duplicates(subset=['full_name'], take_last=True)
    crepo['row_inserted_on'] = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    crepo['description'] = crepo['description'].str.replace('[',' ').replace(']',' ')
    crepo['homepage'] = crepo['homepage'].str.replace('[',' ').replace(']',' ')    
    crepo = crepo.fillna('')
    crepo = crepo.astype(str)
    temp_list = crepo.values.tolist()
    q1 = (", ".join(str(i).replace('(',' ').replace(')',' ').replace("%", " ").replace('"', " ").replace('\\', " ") for i in temp_list)).replace('[','(').replace(']',')')
    sql = q0 + q1
    connection = engine.connect()
    connection.execute(sql)
    connection.close()

 
def no_int(lis):
    """
    This method removes numeric tokens from a list.
    """
    return [x for x in lis if not x.isdigit()]


def tfidf():
    """
    This method runs TFIDF analysis on the readme files of the repositories owned
    by Cisco-Users to get the tools which are Cisco specific.
    """
    user_id = pd.read_csv(MISC_LOCATION + "MiscData/" + "readme_GeneralPopulation.csv")

    #user_id1=pd.read_csv("cisco_combinedreadme.csv")
    readmeCisco = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "readme_CiscoUsers.csv")
    readmeCiscoString = str(readmeCisco["read_me"].tolist()).replace("'","").replace("[","").replace("]","").replace(","," ").replace("nan","")
    user_id1 = pd.DataFrame([['cisco_readme',readmeCiscoString]], columns = user_id.columns)
    
    
    user_id=pd.concat([user_id1, user_id],ignore_index=True)
    repo_readme = user_id['read_me'].values.tolist()
    print len(repo_readme)
    repo_readme = [re.sub("\d", " ", str(x).lower().decode('latin-1').replace('_',' ').replace('python','py').replace('yaml','yml')) for x in repo_readme]
    stopset = set(stopwords.words("english"))
    stopFile = open(MISC_LOCATION + "MiscData/" + "stopwords.txt", "r")
    stopWordsFile = stopFile.read().split()
    stopset.update(["readme","md","txt","rst","markdown","name","user","password","port","path","node","host","dir","url","build","test","dobleslash","dobleqotes"]+np.unique(stopWordsFile).tolist())

    vectorizer = TfidfVectorizer(stop_words=stopset,use_idf=True)
    X = vectorizer.fit_transform(repo_readme)
    names = vectorizer.get_feature_names()
    print "Transformation done!!"
    with open(DATA_LOCATION + "CiscoUsers/" + "tfidf_raw.csv", "w") as file:
	writer = csv.writer(file, delimiter=",")
        writer.writerow(["Repo_Id", "word", "Score"])
        doc_id = 0
        for doc in X:
	    doc=doc.todense()	   
            repo = doc.tolist()[0]
            phrase_scores = [pair for pair in zip(range(0, len(repo)), repo) if pair[1] > 0]
            sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)
            word1 = []
            score1 = []
            for phrase, score in [(names[word_id], score) for (word_id, score) in sorted_phrase_scores][:100]:
                word1.append(phrase)
                score1.append(score)
            writer.writerow([doc_id+1, str(word1).replace("[","").replace("]","").replace("u'","'").replace("nan","").replace("'",""), str(score1).replace("[","").replace("]","")])
            doc_id += 1
    tfidf = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "tfidf_raw.csv")
    result = pd.concat([user_id, tfidf], axis=1)
    result = result[["repo_full_name", "read_me", "word"]]
    expr = lambda x: str([word for word,pos in pos_tag(no_int(filter(None,np.unique(str(x).replace("_",",").replace(" ","").split(",")).tolist()))) ]).replace("[","").replace("]","").replace("'","").replace("nan","")
    print "hi"
    result["noun"] = result['word']
    result['noun'][0] = map(expr, [result['noun'][0]])
    print "hello"
    result.to_csv(DATA_LOCATION + "CiscoUsers/" + "tfidf_processed.csv")
    print "konnichiva"
    return "TFIDF Analysis Completed"



def processingForGraphs():
    """
    This method processes data for charts.
    """
    nw = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "tfidf_processed.csv")
    tfs = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "tfidf_raw.csv")
    read_me=nw["read_me"][0].lower()
    words=tfs["word"][0]
    nouns=nw["noun"][0]
    scores=tfs["Score"][0]
    words=words.replace(" ","").split(",")
    scores=scores.replace(" ","").split(",")
    nouns=nouns.replace(" ","").replace("['","").replace("']","").split(",")

    with open(DATA_LOCATION + "CiscoUsers/" + "cisco_tfidf.csv", "w") as file:
        writer = csv.writer(file, delimiter=",")
        writer.writerow(["noun_id","noun", "frequency", "tfidf-score"])
        noun_id = 0
        for i in nouns:
            a=read_me.count(str(i).strip())
            if not i.isdigit():
                writer.writerow([noun_id+1, i,int(a), scores[words.index(i)]])
                noun_id += 1
    return "Processing Data for Graphs Completed"
 

def getReadme(args):
    """
    This method makes api calls to github for each repository to get readme file.
    """
    user_repo = args
    failure_count = 0
    while True:
        link = "https://github.com/"+str(user_repo)
        try:
            page = requests.get(link)
            tree = html.fromstring(page.text)
            cont = tree.xpath('//div[@id="readme"]//text()')
            cont=";".join(cont).replace("\n", " ").replace(";", " ")
            cont= re.sub(re.compile(r'\s+'), ' ', cont).strip()
            q1 = ", ".join([str(user_repo),str(cont).replace(',',' ')])
            return q1
        except Exception:
            if failure_count > 1:
                print "Inserted adjusted Information for the user: ",user_repo
                return ", ".join([str(user_repo), ''])
            else:
                failure_count = failure_count + 1
                continue


def getCiscoReadme():
    """
    This method is used to get the Readme files for repositories owned by Cisco Users.
    """
    user_id=pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "repository_info.csv")
    repo_full_name=user_id['full_name'].values.tolist()
    
    repo_info_df = pd.DataFrame()
    step = 500
    l1, l2 = 0, step
    print "Total number of pages : ", len(repo_full_name)
    start = datetime.datetime.now()
    print "Start time is: ",start
    for i in range(int(math.ceil(float(len(repo_full_name))/step))):
        if l2 > len(repo_full_name):
            l2 = len(repo_full_name)
        print l1, l2
        lis = repo_full_name[l1:l2]
        args = (i for i in lis)
        p = Pool(processes=4)
        q0 = p.map(getReadme, args)
        p.close()
        p.join()
        api_output = ";".join(q0)
        api_output = api_output.split(';')
        api_output = [i.replace('(','').replace(')','').replace("'","").split(', ') for i in api_output]
        repo_info_df = repo_info_df.append(api_output)
        l1, l2 = l2, l2+step
    repo_info_df.columns = ['repo_full_name','read_me']    
    repo_info_df = repo_info_df[repo_info_df['read_me']!='']

    repo_info_df.to_csv(DATA_LOCATION + "CiscoUsers/" + "readme_CiscoUsers.csv", index=False)

    end = datetime.datetime.now()
    print "End time is: ",end  
    print "Total time taken: ", (end-start).total_seconds()  
    return "Readme files for the Cisco Users pulled"


def getRepoDetails(args):
    """
    This method makes api calls to github for each user counter.
    """
    user, clientid, clientsecret = args
    page_number = 1
    failure_count = 0
    temp_list = []
    while True:
        link = 'https://api.github.com/users/'+str(user)+'/repos?per_page=100&page='+str(page_number)+'&client_id='+clientid+'&client_secret='+clientsecret
        try:
            r = requests.get(link) #settimeout
            if(r.ok and r.text!='[]'):
                item = json.loads(r.text or r.content)
                for repoItem in item:
                    login = user
                    try:
                        user_id =  repoItem['id']
                    except:
                        user_id =  -1
                    try:
                        name =  repoItem['name']
                    except:
                        name =  ''
                    try:
                        full_name =  repoItem['full_name']
                    except:
                        full_name =  ''
                    try:
                        private =  (1 if repoItem['private'] is True else 0)
                    except:
                        private =  -1
                    try:
                        description =  repoItem['description'].replace(',',' ').replace('(',' ').replace(')',' ').replace('[',' ').replace(']',' ').replace("%", " ").replace('"', " ").replace('\\', " ")
                    except:
                        description =  ''
                    try:
                        fork =  (1 if repoItem['fork'] is True else 0)
                    except:
                        fork  =  -1
                    try:
                        created_at =  repoItem['created_at']
                    except:
                        created_at  =  ''
                    try:
                        updated_at =  repoItem['updated_at']
                    except:
                        updated_at  =  ''
                    try:
                        pushed_at =  repoItem['pushed_at']
                    except:
                        pushed_at  =  ''
                    try:
                        homepage =  repoItem['homepage'].replace(',',' ').replace('(',' ').replace(')',' ').replace('[',' ').replace(']',' ').replace("%", " ").replace('"', " ").replace('\\', " ")
                    except:
                        homepage  =  ''
                    try:
                        size =  repoItem['size']
                    except:
                        size  =  -1
                    try:
                        watchers_count =  repoItem['watchers_count']
                    except:
                        watchers_count  =  -1
                    try:
                        language =  repoItem['language']
                    except:
                        language  =  ''
                    try:
                        has_issues =  (1 if repoItem['has_issues'] is True else 0)
                    except:
                        has_issues  =  -1
                    try:
                        has_downloads =  (1 if repoItem['has_downloads'] is True else 0)
                    except:
                        has_downloads  =  -1      
                    try:
                        has_wiki =  (1 if repoItem['has_wiki'] is True else 0)
                    except:
                        has_wiki =  -1
                    try:
                        has_pages =  (1 if repoItem['has_pages'] is True else 0)
                    except:
                        has_pages =  -1
                    try:
                        forks_count =  repoItem['forks_count']
                    except:
                        forks_count  =  -1 
                    try:
                        open_issues =  repoItem['open_issues']
                    except:
                        open_issues  =  -1 
                    try:
                        default_branch =  repoItem['default_branch'].replace(',',' ').replace('(',' ').replace(')',' ').replace('[',' ').replace(']',' ').replace("%", " ").replace('"', " ").replace('\\', " ")
                    except:
                        default_branch  =  ''
                        
                    temp_list.append((
                        str(login),user_id,str(name),str(full_name),private,str(description),fork,str(created_at),str(updated_at),str(pushed_at),str(homepage),size,watchers_count,str(language),has_issues,has_downloads,has_wiki,has_pages,forks_count,open_issues,str(default_branch)
                        ))
                page_number = page_number+1
            else:
                if temp_list:
                    q1 = ";".join([str(i) for i in temp_list])
                    return q1
                else:
                    return ", ".join([str(user), '','', '', '','','','','','','','','','','','','','','','',''])
        except Exception, err:
            if failure_count > 0:
                print "Inserted adjusted Information for the user: ",user
                return ", ".join([str(user), '','', '', '','','','','','','','','','','','','','','','',''])
            else:
                failure_count = failure_count + 1
                continue


def getCiscoUsersRepo():
    """
    This method is used to get the repositories owned by the Cisco Users in github.
    """
    total_requests = 5000
    requests_per_resource = 2
    calls_per_token  = int(total_requests/requests_per_resource)

    user_id=pd.read_csv(DATA_LOCATION + "CiscoUsers/" +"cisco_user_list.csv")
    repo_full_name=user_id['login'].values.tolist()
    
    tokens = pd.read_csv(MISC_LOCATION + "MiscData/" + "githup_api_tokens_40.csv")
    clientid = tokens[6:7]['Client ID'].values.tolist()
    clientsecret = tokens[6:7]['Client Secret'].values.tolist()
    num_tokens = len(clientid)
    
    repo_info_df = pd.DataFrame()
    step = 500
    l1, l2 = 0, step
    print "Total number of pages : ", len(repo_full_name)

    start = datetime.datetime.now()
    print "Start time is: ",start
    for i in range(int(math.ceil(float(len(repo_full_name))/step))):
        if l2 > len(repo_full_name):
            l2 = len(repo_full_name)
        print l1, l2
        lis = repo_full_name[l1:l2]
        args = ((li, clientid[0], clientsecret[0]) for li in lis)
        p = Pool(processes=4)
        q0 = p.map(getRepoDetails, args)
        p.close()
        p.join()
        api_output = ";".join(q0)
        api_output = api_output.split(';')
        api_output = [i.replace('(','').replace(')','').replace("'","").split(', ') for i in api_output]
        repo_info_df = repo_info_df.append(api_output)
        l1, l2 = l2, l2+step
        
	if (l1 % 2000 == 0):
            end = datetime.datetime.now()
            print "End time is: ",end
            time_spent = (end-start).total_seconds()
            if time_spent < 3600:
                print "Time spent: ", time_spent
                print "Waiting for the reset of the tokens....\n"
                time.sleep(3700 - time_spent)
            else:
                print "Tokens already reset.........\n"
            start = datetime.datetime.now()
            print "Start time is: ",start
    repo_info_df.columns = ['login','repo_id','name','full_name','is_private','description','is_fork','created_at','updated_at','pushed_at','homepage','size','watchers_count','language','has_issues','has_downloads','has_wiki','has_pages','forks_count','open_issues','default_branch']    
 
    repo_info_df = repo_info_df[repo_info_df['repo_id']!=''] 

    repo_info_df.to_csv(DATA_LOCATION + "CiscoUsers/" + "repository_info.csv", index=False)

    end = datetime.datetime.now()
    print "End time is: ",end  
    print "Total time taken: ", (end-start).total_seconds()  
    return "Repositories for Cisco Users retrieved"

def getUserDetails(args):
    user, clientid,clientsecret = args
    failure_count = 0
    while True:
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
            if failure_count >0:
                print "Inserted adjusted Information for the user: ",user            
                return ", ".join(['',str(user),'','','','','','','','','','','','','','',''])
            else:
                failure_count = failure_count + 1
                continue


def updateCiscoUsers():
    """
    This method is used to update the user-information of Cisco Users in github.
    """
    total_requests = 5000
    requests_per_resource = 2
    calls_per_token  = int(total_requests/requests_per_resource)

    user_id=pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "cisco_user_list.csv")
    repo_full_name=user_id['login'].values.tolist()

    tokens = pd.read_csv(MISC_LOCATION + "MiscData/" + "githup_api_tokens_40.csv")
    clientid = tokens[6:7]['Client ID'].values.tolist()
    clientsecret = tokens[6:7]['Client Secret'].values.tolist()
    num_tokens = len(clientid)

    user_info_df = pd.DataFrame()
    step = 500
    l1, l2 = 0, step
    print "Total number of pages : ", len(repo_full_name)

    start = datetime.datetime.now()
    print "Start time is: ",start
    for i in range(int(math.ceil(float(len(repo_full_name))/step))):
        if l2 > len(repo_full_name):
            l2 = len(repo_full_name)
        print l1, l2
        lis = repo_full_name[l1:l2]
        args = ((li, clientid[0], clientsecret[0]) for li in lis)
        p = Pool(processes=4)
        q0 = p.map(getUserDetails, args)
        p.close()
        p.join()
        api_output = ";".join(q0)
        api_output = api_output.split(';')
        api_output = [i.replace('(','').replace(')','').replace("'","").split(', ') for i in api_output]
        user_info_df = user_info_df.append(api_output)
        l1, l2 = l2, l2+step

        if (l1 % 2000 == 0):
            end = datetime.datetime.now()
            print "End time is: ",end
            time_spent = (end-start).total_seconds()
            if time_spent < 3600:
                print "Time spent: ", time_spent
                print "Waiting for the reset of the tokens....\n"
                time.sleep(3700 - time_spent)
            else:
                print "Tokens already reset.........\n"
            start = datetime.datetime.now()
            print "Start time is: ",start
    user_info_df.columns = ['user_id','login','user_type','site_admin','name','company','blog','location','email','hireable','bio','public_repos','public_gists','followers','following','created_at','updated_at']

    user_info_df = user_info_df[user_info_df['user_id']!='']

    user_info_df.to_csv(DATA_LOCATION + "CiscoUsers/" + "cisco_user_list.csv", index=False)

    end = datetime.datetime.now()
    print "End time is: ",end
    print "Total time taken: ", (end-start).total_seconds()
    print "sleeping for 1 hour"
    time.sleep(3600)
    return "Cisco Users updated"


def getCiscoUsers():
    """
    This method parses the General Population to get the Cisco specific Users.
    """
    final_df = pd.DataFrame()
    for files in glob(DATA_LOCATION + "GeneralUsers/" + "Users_Level2_*.csv"):
        print files
        df=pd.read_csv(files)
        df_copy=df.copy(deep=True)
        for i in ['login','name','company','blog','email']:
            df_copy[i] = df_copy[i].map(lambda x: str(x).lower())
        df_copy=df_copy.fillna("missing")
        df_copy=df_copy.replace({"francisco":"franc"}, regex=True)
        ciscoUsersList=[]
        for i in ['login','name','company','blog','email']:
            ciscoUsersList.append(df_copy[df_copy.ix[:,i].str.contains("cisco")])
        ciscoUsersDF=pd.concat(ciscoUsersList).drop_duplicates()
        s=pd.DataFrame(df,index=ciscoUsersDF.index)
        final_df = final_df.append(s)
	df = pd.DataFrame()
	df_copy = pd.DataFrame()
	time.sleep(100)
    final_df[['user_id','login','user_type','site_admin','name','company','blog','location','email','hireable','bio','public_repos','public_gists','followers','following','created_at','updated_at']].to_csv(DATA_LOCATION + "CiscoUsers/" +  "cisco_user_list.csv",index=False)
    return "Cisco Users collected"

def getTimelineStats():
    """
    This method would derive the stats from the timeline data collected for Cisco Techtrends.
    """
    
    user_list = pd.read_csv(DATA_LOCATION + "CiscoUsers/" + "cisco_user_list.csv")
    print user_list.shape
    user_list = user_list.drop_duplicates()
    print user_list.shape

    final = pd.DataFrame()
    for filename in glob(TIMELINE_LOCATION + "gh*.csv"):
        print filename
        timeline = pd.read_csv(filename)
        timeline = timeline[(timeline["actor_login"].isin(user_list["login"]))] #actor_login #repository_owner
        final = final.append(timeline)

    final.to_csv(DATA_LOCATION + "CiscoUsers/" + "ciscoUserTimelineByActorLogin.csv", index = False)
    return "Stored Timeline data"

if __name__ == "__main__":
    #print getCiscoUsers()
    #print updateCiscoUsers()
    #print getCiscoUsersRepo()
    #print getCiscoReadme()
    #print getTimelineStats()
    #print tfidf()
    #print processingForGraphs()
    #storeCiscoUserList()
    #storeRepositoryInfo()
    storeTimelineInfo()
    #storeTfidf()
