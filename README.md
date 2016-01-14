# COSE - Cisco Open Source Engagement

### About COSE
The overall goal of this is to raise the awareness of open source within Cisco and increase the overall contribution by Cisco to communities and various projects.

### COSE Cluster
The COSE application is running on a separate DCOS cluster. DCOS cluster has 10 instances: 3 masters (16GB RAM | 4 VCPU), 4 slaves (32GB RAM | 8 VCPU), 1 public slave (16GB RAM | 4 VCPU), 1 load balancer (2GB RAM | 1 VCPU), 1 VPN-server (2GB RAM | 1 VCPU).


* Master nodes:
  * 192.168.0.13    cis-cose-master-01
  * 192.168.0.8    cis-cose-master-02
  * 192.168.0.12   cis-cose-master-03


* Slaves:
  * 192.168.0.9     cis-cose-slave-01
  * 192.168.0.7    cis-cose-slave-02
  * 192.168.0.10     cis-cose-slave-03
  * 192.168.0.11    cis-cose-slave-04


* Public Slave using for security/access reasons:
  * 192.168.0.6 cis-cose-slave-public-01 (floating IP: 128.107.5.125)


* Load Balancer:
  * 192.168.0.5 cis-cose-lb-01


* VPN-server:
  * 192.168.0.2   cis-cose-vpn-01 (floating IP: 128.107.5.123)


* Accessing the VPN network:
  1. Open Cisco AnyConnect instance
  2. Input VPN Server address: 128.107.5.123
  3. username: cose
  4. password: 7a4vU6aG


* Connect to any host in cluster by using cis-cose-us-texas-3.pem key.
```
   $ ssh -i cis-cose-us-texas-3.pem cloud-user@192.168.0.X
```


### Application Architecture
[![](http://img.ctrlv.in/img/16/01/14/569750a49c8d9.png)](http://ctrlv.in/696568)

### Data Source
[GitHub](https://github.com/) hosts open-source software projects. This is the main source of data.

The data is gathered via:
* [GitHub API](https://developer.github.com/v3/)
  * User Level data - Username, Company the user works for, # of Followers,  # of Following, # of Public Repos,# of Contributions, Repos contributed to,  attributes etc.
  * Repository Level data - Watchers, Forks, Commit, Comments, Response time, unique Contributors and collaborators
* [Google BigQuery](https://cloud.google.com/bigquery/)
  * Events timeline data - This is used to capture timeline of [Events](https://developer.github.com/v3/activity/events/) performed by a User on a Repository.

### Data gathering and processing
[![](http://img.ctrlv.in/img/16/01/12/5694d7f734972.png)](http://ctrlv.in/695648)

### Running the Application
The WebApp is based on server-client model. The Server is implemented with Node.js and Client is written in HTML, CSS and JS.
#### Server
The [Server](https://github.com/CiscoCloud/COSE/tree/master/Codebase/WebApp/COSEServer) is written using Node.js. The Server can be started by running the "server.js" file.
```js
    $ node server.js
```

#### Client
The [Client](https://github.com/CiscoCloud/COSE/tree/master/Codebase/WebApp/COSEClient) is written in HTML, CSS, and JS. The Client is a D3 based interactive web dashboard to visualize COSE. The Client can be accessed from [COSE](http://128.107.5.189/).
