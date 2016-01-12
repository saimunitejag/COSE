#### Processors
Processors are used to:-
* Identify cisco users from the user-list of general population.
* Analyze the technologies/projects that cisco users are contributing to.
* Store various statistics about cisco users to MySQL db.

##### Crontab Entry to manage Processors.
```
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/opt/hdfs/bin

10 16 * * 1-6 cd /mnt/datavol/GithubAnalysis/COSE/Codebase/Processors/; python /mnt/datavol/GithubAnalysis/COSE/Codebase/Processors/processorUsersMain.py >> /mnt/datavol/GithubAnalysis/COSE/Codebase/Processors/ProcessorsLog.log 2>&1
```
