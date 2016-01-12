from sqlalchemy import create_engine
DATA_LOCATION = "/mnt/datavol/GithubAnalysis/UsersAnalysis/Data/"
MISC_LOCATION = "/mnt/datavol/GithubAnalysis/"
TIMELINE_LOCATION = "/mnt/datavol/GithubAnalysis/Techtrends/Data/timeline_files/"
engine = create_engine("mysql://ta_user:Y26bw@-Z@128.107.13.232:3306/tiger_analytics_db?charset=utf8",pool_size=20, max_overflow=0)
#engine = create_engine("mysql://tiger_user:tiger!23@ec2-50-17-248-223.compute-1.amazonaws.com:3306/github_analytics_db?charset=utf8",pool_size=20, max_overflow=0)
