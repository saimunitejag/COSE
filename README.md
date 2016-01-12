# COSE - Cisco Open Source Engagement

### About COSE
The overall goal of this is to raise the awareness of open source within Cisco and increase the overall contribution by Cisco to communities and various projects.

### Application Architecture
main source of data.


### Data Source
[GitHub](https://github.com/) hosts open-source software projects. This is the main source of data.

The data is gathered via:
* [GitHub API](https://developer.github.com/v3/)
  * User Level data - Username, Company the user works for, # of Followers,  # of Following, # of Public Repos,# of Contributions, Repos contributed to,  attributes etc.
  * Repository Level data - Watchers, Forks, Commit, Comments, Response time, unique Contributors and collaborators
* [Google BigQuery](https://cloud.google.com/bigquery/)
  * Events timeline data - This is used to capture timeline of [Events](https://developer.github.com/v3/activity/events/) performed by a User on a Repository.

### Running the Application

#### Server
The Server is written using Node.js

#### Client
This Client is written in HTML, CSS, and JS.

#### Accessing Web application:
A D3 based interactive web dashboard to visualize [COSE](http://128.107.5.189/).

#### Crontab Entry to manage data aggregators.
```
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/opt/hdfs/bin

59 20 * * * cd /mnt/datavol/GithubAnalysis/Techtrends/Codebase/Crawlers/; python /mnt/datavol/GithubAnalysis/Techtrends/Codebase/Crawlers/BigQuery_GithubTimeline.py >> /mnt/datavol/GithubAnalysis/Techtrends/Codebase/Crawlers/BigQuryLog.log 2>&1
10 21 * * 1-6 cd /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Crawlers/; sh /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Crawlers/scheduleUsers.sh >> /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Crawlers/UersLog.log 2>&1
10 16 * * 1-6 cd /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Processors/; python /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Processors/processorUsersMain.py >> /mnt/datavol/GithubAnalysis/UsersAnalysis/Codebase/Processors/ProcessorsLog.log 2>&1
```
