PROJECT_NUMBER='turing-clover-817' #'decent-micron-803'#Google  developer Project Number
SERVICE_ACCOUNT_EMAIL='892247925786-lerfsd75oj39lkfb66icdkq2eb0b3ap2@developer.gserviceaccount.com' #'612668830024-mu6a56c4b19d9t8aoovbrlh2l3btqvfi@developer.gserviceaccount.com'
RUN_FREQ = 1     #variable to tweak the frequency of running the code.
STEP_SIZE_HOURS = 6;  #Used to create the day partition by hours. Note: STEP_SIZE_HOURS should be in (1, 2, 3, 4, 6, 8, 12, 24) i.e., divisors of 24.
SCRIPT_LOCATION = "/mnt/datavol/GithubAnalysis/Techtrends/Codebase/Crawlers/"
f = file(SCRIPT_LOCATION + 'google-api-client-key.pem', 'rb')
key = f.read()
f.close()
HDFS_LOCATION1 = "hdfs://hdfs/"
HDFS_LOCATION2 = "hdfs://hdfs/"
DATA_LOCATION = "/mnt/datavol/GithubAnalysis/Techtrends/Data/"
LAST_RUN = "20151123"
