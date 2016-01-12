#### Crawlers
Crawlers are used to pull the data related to open-source projects from GitHub.

##### Crontab Entry to manage data crawlers.
```
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/opt/hdfs/bin

59 20 * * * cd /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/; python /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/BigQuery_GithubTimeline.py >> /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/BigQuryLog.log 2>&1
10 21 * * * cd /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/; sh /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/scheduleUsers.sh >> /mnt/datavol/GithubAnalysis/COSE/Codebase/Crawlers/UersLog.log 2>&1
```
